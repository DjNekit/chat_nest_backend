import * as cookie from 'cookie';
import { Response } from 'express';

export const setRefreshTokenInCookie = (res: Response, refreshToken: string) => {
  res.setHeader(
    'Set-Cookie', 
    cookie.serialize('refresh-token', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // Жизнь кукиса как у рефреш токена, 7 дней
      domain: 'nextclient-jade.vercel.app', //process.env.COOKIE_DOMAIN,//
      path: '/',
      sameSite: 'none'
    })
  );
};