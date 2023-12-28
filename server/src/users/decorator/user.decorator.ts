import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UsersModel } from '../entities/users.entity';

export const User = createParamDecorator(
  (data: keyof UsersModel, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user as UsersModel;

    // if (!user) {
    //   throw new InternalServerErrorException(
    //     'User decorator must be used with AccessTokenGuard',
    //   );
    // }

    if (data) {
      return user[data];
    }

    return user;
  },
);
