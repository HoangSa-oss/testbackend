import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    async use(req: any, res: any, next: () => void) {
        const tenant = req.headers['x-tenant-id'];
        // if (!tenant) {
        //     throw new BadRequestException('Tenant not found');
        // }

        next();
    }
}
