import { Controller, Post, Body } from '@nestjs/common';
import { TransactionHookService } from './transaction-hook.service';
import { CallBackData } from '@/lib/dto/callback-data';

@Controller('transaction-hook')
export class TransactionHookController {
    constructor(
        private readonly transactionHookService: TransactionHookService,
    ) {}

    @Post()
    async create(@Body() apiResponse: CallBackData) {
        return await this.transactionHookService.create(apiResponse);
    }
}
