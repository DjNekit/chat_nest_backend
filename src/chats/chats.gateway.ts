import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class ChatsGateway {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    client.emit('message', { data: 'test' })
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data) {
    console.log(data)
    // return data 
  }
}