import { IsEmail, IsString, IsUUID } from "class-validator";
import { PasswordLength } from "src/lib/decorators/passwordLength.decorator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @PasswordLength()
  password: string;
}