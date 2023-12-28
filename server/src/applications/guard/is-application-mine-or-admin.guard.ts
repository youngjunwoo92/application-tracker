import {
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { ApplicationsService } from '../applications.service';
import { UsersModel } from 'src/users/entities/users.entity';
import { RolesEnum } from 'src/users/const/roles.const';

@Injectable()
export class IsApplicationMineOrAdmin implements CanActivate {
  constructor(private readonly applicationService: ApplicationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request & {
      user: UsersModel;
    };

    const { user } = req;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.role === RolesEnum.ADMIN) {
      return true;
    }

    const applicationId = req.params.applicationId;

    if (!applicationId) {
      throw new BadRequestException('Invalid application ID');
    }

    const isOk = await this.applicationService.isApplicationMine(
      user.id,
      parseInt(applicationId),
    );

    if (!isOk) {
      throw new NotFoundException();
    }

    return true;
  }
}
