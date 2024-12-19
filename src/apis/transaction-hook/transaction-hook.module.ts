import { Module } from '@nestjs/common';
import { TransactionHookService } from './transaction-hook.service';
import { TransactionHookController } from './transaction-hook.controller';
import { Merchant, MerchantSchema } from '@/entities/merchant.entity';
import { Topup, TopupSchema } from '@/entities/topup.entity';
import {
    TransactionHistory,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { Transaction, TransactionSchema } from '@/entities/transaction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: TransactionHistory.name, schema: TransactionHistorySchema },
            { name: Merchant.name, schema: MerchantSchema },
            { name: Topup.name, schema: TopupSchema },
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
