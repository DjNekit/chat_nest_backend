import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { UseGuards } from "@nestjs/common";
import { WsGuard } from "./guards/ws.guard";
import { AuthService } from '../auth/auth.service';
import { UsersService } from "../users/users.service";
import { AuthSocket, wsAuthMiddleware } from "./middleware/ws.middleware";
import { SubscribeEvent } from "./decorators/SubscribeEvent";
import { IoAdapter } from "@nestjs/platform-socket.io";

@WebSocketGateway({
  cors: {
    origin: true
  }
})
export class ChatsGateway {
  constructor(
    private authService: AuthService,
    private chatsService: ChatsService,
  ) {}

  @WebSocketServer()
  server: Server

  afterInit(server: Server) {
    server.use(wsAuthMiddleware(this.authService))
  }
  
  async handleConnection(client: AuthSocket) {
    const chatsIds = await this.chatsService.getChatsIds(client.user.id)

    chatsIds.forEach(chat => {
      client.join(String(chat.id))
    })
  }
  @SubscribeEvent('newMessage')
  @UseGuards(WsGuard)
  async newMessage(
    @MessageBody() data, 
    @ConnectedSocket() client: AuthSocket
  ) {
    const { chatId } = data

    await this.chatsService.saveMessage(data)

    client.to(String(chatId)).emit('message', data)

    // this.server.to()

    // client.emit('message', {
    //   text: data.content
    // })
    // client.emit('message', {
    //   // id: counter,
    //   // message: ++counter
    // })
  }
}