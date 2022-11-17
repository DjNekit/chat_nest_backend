import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class SigninStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email, password) {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}