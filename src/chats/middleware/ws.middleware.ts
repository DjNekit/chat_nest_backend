import { Socket } from "socket.io"
import { AuthService } from "../../auth/auth.service"
import { NextFunction } from "express"

export interface AuthSocket extends Socket {
  user: any
}

export const wsAuthMiddleware = (authService: AuthService) => {
  return async (client: AuthSocket, next: NextFunction) => {
    console.log('middleware')
    try {
      const accessToken = client.handshake.auth.token
      const verifiedDataFromJwt = await authService.validateToken(accessToken)
      const { iat, exp, sub, ...user } = verifiedDataFromJwt
      client.user = {
        id: sub,
        ...user
      }
      next()
    } catch (error) {      
      next({
        name: 'Unauthorized',
        message: 'Unauthorized'
      })
      client.disconnect()
    }
  }
}