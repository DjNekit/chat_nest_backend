import * as cookie from 'cookie';
import { Response } from 'express';

export const setRefreshTokenInCookie = (res: Response, refreshToken: string) => {
  res.setHeader(
    'Set-Cookie', 
    cookie.serialize('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // Жизнь кукиса как у рефреш токена, 7 дней
      // domain: 'localhost',
      // path: '/v1/auth'
    })
  );
};