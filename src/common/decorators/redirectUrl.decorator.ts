import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REDIRECT_KEY } from 'src/data/constants/route.constants';

export const RedirectUrl = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const redirectTo: string = request[REDIRECT_KEY];

    if (!redirectTo) {
      return null;
    }

    return redirectTo;
  }
);
