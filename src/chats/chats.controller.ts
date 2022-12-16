import { Controller, Get, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";
import { User } from "../lib/decorators/user.decorator";

@Controller({
  version: '1',
  path: '/chats'
})
export class ChatsController {
  @Get()
  @UseGuards(AccessTokenGuard)
  async getChats(@User('id') userId: number) {
    return {
      chats: []
    }
  }
}