import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<number>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has the required permissions
    return (user.permissions & requiredPermissions) === requiredPermissions;
  }
}
