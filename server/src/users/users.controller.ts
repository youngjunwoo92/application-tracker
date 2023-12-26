import { Controller, Get } from '@nestjs/common';

import { UsersModel } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UsersModel[]> {
    return this.usersService.getAllUsers();
  }
}
