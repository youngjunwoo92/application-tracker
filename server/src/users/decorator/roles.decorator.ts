import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../const/roles.const';

export const ROLES_KEY = 'user_role';

export const Roles = (role: RolesEnum) => SetMetadata(ROLES_KEY, role);
