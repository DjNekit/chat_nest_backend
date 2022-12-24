import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cookies } from 'src/lib/decorators/cookie.decorator';
import { User } from 'src/lib/decorators/user.decorator';
import { setRefreshTokenInCookie } from 'src/lib/utils/setRefreshTokenInCookie';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SigninGuard } from './guards/signin.guard';

@Controller({
  version: '1',
  path: '/auth'
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { 
      accessToken, 
      refreshToken,
    } = await this.authService.signup(createUserDto);

    setRefreshTokenInCookie(res, refreshToken);

    return { accessToken };
  }

  @Post('/signin')
  @UseGuards(SigninGuard)
  async signIn(
    @User() user,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signin(user);

    setRefreshTokenInCookie(res, refreshToken);

    return { accessToken };
  }

  @Post('/signout')
  @UseGuards(AccessTokenGuard)
  async logout(
    @User('id') id: number,
    @Res({ passthrough: true }) res: Response
  ) {

    setRefreshTokenInCookie(res, '');
    await this.authService.logout(id);

    return {};
  }
  @Post('/refresh-tokens')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @User('id') id: number,
    @Cookies('refresh-token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(id, refreshToken);

    if (!tokens) {
      setRefreshTokenInCookie(res, '');
      throw new UnauthorizedException('refresh error');
    }

    setRefreshTokenInCookie(res, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken
    };
  }

  @Get('current-user')
  @UseGuards(AccessTokenGuard)
  async getCurrentUser(
    @User() user,
  ) {
    const { iat, exp, ...restUserData } = user
    return restUserData;
  }
}
