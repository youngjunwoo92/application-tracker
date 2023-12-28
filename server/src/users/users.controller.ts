import { Controller, Get } from '@nestjs/common';

import { UsersModel } from './entities/users.entity';
import { Roles } from './decorator/roles.decorator';
import { RolesEnum } from './const/roles.const';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  getUsers(): Promise<UsersModel[]> {
    return this.usersService.getAllUsers();
  }
}
