import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller({
  version: '1',
  path: '/users'
})
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsersByQuery(@Query('searchValue') searchValue) {
    console.log(searchValue)
    const users = await this.usersService.findAllByQuery(searchValue)
    return {
      users
    }
  }
}