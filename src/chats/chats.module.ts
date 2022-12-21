import { Module } from "@nestjs/common";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";
import { ChatsGateway } from "./chats.gateway";

@Module({
  //controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService]
})
export class ChatsModule {}