import {
  UnauthorizedException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token Not Found');
    }

    const token = this.authService.extractTokenFromHeader(
      authorizationHeader,
      'Bearer',
    );

    const result = await this.authService.verifyToken(token);
    const user = await this.usersService.getUserByEmail(result.email);

    req.user = user;
    req.token = token;
    req.tokenType = result.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Invalid Access Token');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return true;
  }
}
