import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'rolesaopsidjaoudbausdsapdybappisiudhgroles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
