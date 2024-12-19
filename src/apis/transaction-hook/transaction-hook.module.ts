import { Module } from '@nestjs/common';
import { TransactionHookService } from './transaction-hook.service';
import { TransactionHookController } from './transaction-hook.controller';
import { MerchantV2, MerchantSchema } from '@/entities/merchant.entity';
import { TopupV2, TopupSchema } from '@/entities/topup.entity';
import {
    TransactionHistoryV2,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { TransactionV2, TransactionSchema } from '@/entities/transaction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TransactionV2.name, schema: TransactionSchema },
            { name: TransactionHistoryV2.name, schema: TransactionHistorySchema },
            { name: MerchantV2.name, schema: MerchantSchema },
            { name: TopupV2.name, schema: TopupSchema },
        ]),
    ],
    controllers: [TransactionHookController],
    providers: [
        TransactionHookService,
        TransactionsService,
        TransactionHistoriesService,
    ],
})
export class TransactionHookModule {}
