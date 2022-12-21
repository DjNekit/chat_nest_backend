import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class ChatsGateway {
  constructor(private chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    client.emit('message', { 
      data: {}//this.chatsService.getChats()
    })
  }
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data) {
    console.log(data)
    // return data 
  }
}