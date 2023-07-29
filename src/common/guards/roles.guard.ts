import { UserEntity } from '@entities/user.entity';
import { Role } from '@enums/user.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  IS_PUBLIC_KEY,
  REQUEST_USER_KEY,
  ROLES_KEY,
} from 'src/data/constants/auth.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    if (!contextRoles) return true;

    const user: UserEntity = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return contextRoles.includes(user.role);
  }
}
