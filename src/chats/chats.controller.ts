import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";
import { User } from "../lib/decorators/user.decorator";
import { ChatsService } from "./chats.service";

@Controller({
  version: '1',
  path: '/chats'
})
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getChats(
    @User('id') userId: number,
    @Query('companionId') companionId: string,
  ) {

    if (companionId) {
      const chat = await this.chatsService.findOrCreateChat(userId, companionId)
      return chat
    }
     
    const chats = await this.chatsService.getChats(userId)

    return chats
  }
}