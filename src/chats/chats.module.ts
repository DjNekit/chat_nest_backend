import { Module } from "@nestjs/common";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";
import { ChatsGateway } from "./chats.gateway";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  //controllers: [ChatsController],
  imports: [AuthModule, UsersModule],
  providers: [ChatsGateway, ChatsService]
})
export class ChatsModule {}