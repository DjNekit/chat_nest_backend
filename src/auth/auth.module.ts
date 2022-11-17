import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { SigninStrategy } from './strategies/signin.startegy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      
    }),
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    SigninStrategy, 
    AccessTokenStrategy, 
    RefreshTokenStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
