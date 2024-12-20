import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        err: any,
        token: any,
        info: any,
        context: ExecutionContext,
        status?: any,
    ): TUser {
        if (err || !token) {
            throw err || new UnauthorizedException();
        }
        return token;
    }
}
