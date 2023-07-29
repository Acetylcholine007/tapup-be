import { UserEntity } from '@entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/data/constants/auth.constants';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request[REQUEST_USER_KEY];

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  }
);
