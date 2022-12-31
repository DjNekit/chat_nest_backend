import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entity/chat.entity";
import { User } from "../users/entity/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  async getChats(userId: number) {
    const result = await this.chatsRepository
      .createQueryBuilder('chat')
      .leftJoin('chat.members', 'user')
      .where('user.id = :id', { id: userId })
      .getMany()

    const chatIds = result.map(chat => chat.id)

    const chatsWithMembers = await this.chatsRepository
      .createQueryBuilder('chat')
      .whereInIds(chatIds)
      .leftJoinAndSelect('chat.members', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .getMany()


    return chatsWithMembers
  }

  async findOrCreateChat(userId, companionId) {
    this.chatsRepository
      .createQueryBuilder()

      
    return {

    }
  }
}