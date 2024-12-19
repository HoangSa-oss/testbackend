import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
    data: T;
}

/*
 * Custom data response
 * Init to base controller
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const result = {
                    statusCode: HttpStatus.OK,
                    data: data,
                };

                return result;
            }),
        );
    }
}
