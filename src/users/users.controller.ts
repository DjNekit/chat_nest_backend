import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "src/auth/guards/access-token.guard";
import { User } from "src/lib/decorators/user.decorator";
import { UsersService } from "./users.service";

@Controller({
  version: '1',
  path: '/users'
})
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getUsersByQuery(
    @Query('value') searchValue: string,
    @User('id') userId: number,
  ) {
    //! TODO добавить поиск по частичному совпадению имени
    const users = await this.usersService.findAllByQuery(userId, searchValue)

    return {
      users
    }
  }
}