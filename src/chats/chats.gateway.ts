import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatsService } from "./chats.service";
import { UseGuards } from "@nestjs/common";
import { WsGuard } from "./guards/ws.guard";
import { AuthService } from '../auth/auth.service';
import { UsersService } from "../users/users.service";
import { AuthSocket, wsAuthMiddleware } from "./middleware/ws.middleware";
import { SubscribeEvent } from "./decorators/SubscribeEvent";

@WebSocketGateway({
  cors: {
    origin: true
  }
})
export class ChatsGateway {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private chatsService: ChatsService
  ) {}

  // @WebSocketServer()
  // server: Server

  afterInit(server: Server) {
    server.use(wsAuthMiddleware(this.authService))
  }
  
  handleConnection(client: AuthSocket) {
    // client.emit('message', {
    //   id: counter,
    //   message: ++counter
    // })
  }
  @SubscribeEvent('events')
  @UseGuards(WsGuard)
  handleEvent(
    @MessageBody() data, 
    @ConnectedSocket() client: AuthSocket
  ) {
    console.log(data)
    // client.emit('message', {
    //   // id: counter,
    //   // message: ++counter
    // })
  }

  @SubscribeMessage('message')
  @UseGuards(WsGuard)
  handleMessage(@MessageBody() data ) {
     
  }
}