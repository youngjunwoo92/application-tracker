import {
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private throwForbiddenException(): never {
    throw new ForbiddenException(
      'Access denied. You do not have the necessary permissions to perform this operation.',
    );
  }

  /**
   * Checks if the user has the required role to access the resource.
   * @param context The execution context.
   * @returns A boolean indicating whether the user has the required role.
   */

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve the required role from the decorator
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no role is required, access is granted
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.role !== requiredRole) {
      this.throwForbiddenException();
    }

    // Access is granted
    return true;
  }
}
