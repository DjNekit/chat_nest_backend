import { Controller, Get } from "@nestjs/common";

@Controller({
  version: '1',
  path: '/users'
})
export class UsersController {
  @Get()
  async getUsers() {
    return {
      users: []
    }
  }
}