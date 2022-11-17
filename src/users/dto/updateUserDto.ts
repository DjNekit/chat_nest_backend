import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
  id: number;
}