import { Role } from '@enums/user.enum';
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/data/constants/auth.constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
