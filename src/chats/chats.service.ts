import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entity/chat.entity";
import { User } from "../users/entity/user.entity";
import { UsersService } from "src/users/users.service";
import { Message } from "./entity/message.entity";

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    // private usersRepository: Repository<User>,
    private usersService: UsersService
  ) { }

  async getChatsIds(userId: number) {
    const chatIds = await this.chatsRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.members', 'user')
      .where('user.id = :id', { id: userId })
      .select('chat.id')
      .getMany()

    return chatIds
  }

  async getChats(userId: number) {
    const chatIds = await this.getChatsIds(userId)
    console.log(chatIds)

    if (chatIds.length > 0) {
      const chatsWithMembers = await this.chatsRepository
        .createQueryBuilder('chat')
        .leftJoinAndSelect('chat.members', 'user')
        .whereInIds(chatIds)
        .andWhere('user.id != :id', { id: userId })
        .leftJoinAndSelect('chat.messages', 'message')
        .getMany()
      return chatsWithMembers
    }
    
    return []
    
  }

  async saveMessage(data) {
    const { id, chatId, content, author_id, status } = data

    const newMessage = new Message()
    newMessage.id = id
    newMessage.content = content
    newMessage.chat = chatId
    newMessage.author_id = author_id
    newMessage.status = status

    await this.chatsRepository
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values(newMessage)
      .execute()
  }

  async findOrCreateChat(userId, companionId) {
    const companionChatsIds = await this.getChatsIds(companionId)

    if (companionChatsIds.length > 0) {
      const companionChatWithUserId = await this.chatsRepository
        .createQueryBuilder('chat')
        .leftJoin('chat.members', 'user')
        .whereInIds(companionChatsIds)
        .andWhere('user.id = :id', { id: userId })
        .select('chat.id')
        .getOne()
      
      if (companionChatWithUserId) {
        const loadChat = await this.chatsRepository
          .createQueryBuilder('chat')
          .leftJoinAndSelect('chat.members', 'user')
          .whereInIds(companionChatWithUserId)
          .andWhere('user.id != :id', { id: userId })
          .leftJoinAndSelect('chat.messages', 'messages')
          .getOne()

        return loadChat
      } else {
        return await this.createChat(userId, companionId)
      }
    } else {
      return await this.createChat(userId, companionId)
    }
  }

  async createChat(userId, companionId) {
    const [ user, companion ] = await Promise.all([
      await this.usersService.findById(userId),
      await this.usersService.findById(companionId)
    ])

    console.log(companion)
    const newChat = new Chat()
    newChat.creator_id = userId
    newChat.isPrivate = true

    const { identifiers } = await this.chatsRepository
      .createQueryBuilder('chat')
      .insert()
      .into(Chat)
      .values(newChat)
      .execute()

    await this.chatsRepository
      .createQueryBuilder('chat')
      .relation(Chat, 'members')
      .of(identifiers[0].id)
      .add(user)

    await this.chatsRepository
      .createQueryBuilder('chat')
      .relation(Chat, 'members')
      .of(identifiers[0].id)
      .add(companion)

    return await this.chatsRepository
      .createQueryBuilder('chat')
      .whereInIds([identifiers[0].id])
      .leftJoinAndSelect('chat.members', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .getOne()
  }
}