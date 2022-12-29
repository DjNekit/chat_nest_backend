import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";
import { ChatsGateway } from "./chats.gateway";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { Chat } from './entity/chat.entity';
import { Members } from "./entity/members.entity";
import { Message } from "./entity/message.entity";
import { Status } from "./entity/status.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Members, Message, Status]),
    AuthModule, 
    UsersModule
  ],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService]
})
export class ChatsModule {}