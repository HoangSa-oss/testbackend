import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...args: string[]) =>
  SetMetadata(PERMISSION_KEY, args);

export const PermissionsRequired = (permissions: number) => SetMetadata(PERMISSION_KEY, permissions);
