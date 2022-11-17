import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
  sub: string
  email: string
}
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { email, sub } = payload;

    return {
      id: sub,
      email
    };
  }
}