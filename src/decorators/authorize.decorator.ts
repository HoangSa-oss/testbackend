import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { Permissions } from './permissions.decorator';

export const Authorize = (...args: string[]) => {
  return applyDecorators(
    Permissions(...args),
    UseGuards(JwtAuthGuard, PermissionsGuard),
  );
};
