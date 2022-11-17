import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from "express";

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req?.cookies['refresh-token'] || null;
        return token;
      },
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload) {
    const { sub, email } = payload;
    return {
      id: sub,
      email
    };
  }
}