import { UserEntity } from '@entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  }
);
