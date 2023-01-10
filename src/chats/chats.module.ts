import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";
import { ChatsGateway } from "./chats.gateway";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { Chat } from './entity/chat.entity';
import { Message } from "./entity/message.entity";
import { User } from "src/users/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message, User]),
    AuthModule, 
    UsersModule
  ],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService]
})
export class ChatsModule {}