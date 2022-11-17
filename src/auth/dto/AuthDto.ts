import { IsEmail, IsString } from "class-validator";
import { PasswordLength } from "src/lib/decorators/passwordLength.decorator";

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @PasswordLength()
  password: string;
}