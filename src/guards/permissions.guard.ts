import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionEnum } from 'src/constants/enums';
import { PERMISSION_KEY } from 'src/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    /**
     *
     */
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<
            PermissionEnum[]
        >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredPermissions) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredPermissions.some((p) => user?.permissions?.includes(p));
    }
}
