import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findByIdOrFail(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user || null;
  }

  async create(userData: CreateUserDto) {
    const { email } = userData;
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const newUser = new User();

    for (const userField in userData) {
      newUser[userField] = userData[userField];
    }

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async updateByIdOrFail(id: number, updateData) {
    const user = await this.findByIdOrFail(id);

    for (const field in updateData) {
      user[field] = updateData[field];
    }

    return await await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }
}
