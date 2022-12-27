import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatsService {
  async getChats(userId: number) {
    return [
      {
        id: 123456789,
        creatorId: userId,
        members: [
          {
            id: 1,
            name: 'Nat'
          },
          {
            id: 2,
            name: 'Nat'
          }
        ],
        isGroup: false,
        lastMessage: 'Hello where',
        messages: [
          {
            id: 13434225,
            creatorId: 1,
            text: 'Hello where',
            createDate: Date.now()
          }
        ]
      }
    ]
  }
}