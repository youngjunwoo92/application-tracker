import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UsersModel[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  postUser(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.createUser(email, password);
  }
}
