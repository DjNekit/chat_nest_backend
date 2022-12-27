import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from '../../auth/auth.service';
import { AuthSocket } from '../middleware/ws.middleware';
import { Reflector } from "@nestjs/core";

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<AuthSocket>()
    const eventName = this.reflector.get('eventName', context.getHandler())
    const eventBody = context.switchToWs().getData()

    try {
      const accessToken = client.handshake.auth.token
      const verifiedDataFromJwt = await this.authService.validateToken(accessToken)
      const { iat, exp, sub, ...user } = verifiedDataFromJwt
      client.user = {
        id: sub,
        ...user
      }
      return true
    } catch (error) {
      client.emit('error', {
        message: 'Unauthorized',
        statusCode: 401,
        failedMessage: {
          type: eventName,
          body: eventBody
        }
      })
      return false
    }
  }
}