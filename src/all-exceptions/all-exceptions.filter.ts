import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: T, host: ArgumentsHost) {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        if (exception instanceof HttpException) {
            const statusCode = exception.getStatus() || HttpStatus.BAD_REQUEST;
            httpAdapter.reply(
                ctx.getResponse(),
                exception.getResponse(),
                statusCode,
            );
        } else {
            const responseBody = {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception['message'],
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest()),
            };
            httpAdapter.reply(
                ctx.getResponse(),
                responseBody,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
