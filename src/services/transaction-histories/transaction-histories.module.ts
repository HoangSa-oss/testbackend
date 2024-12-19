import { Module } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import {
    TransactionHistoryV2,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { TransactionV2, TransactionSchema } from '@/entities/transaction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TransactionV2.name, schema: TransactionSchema },
            { name: TransactionHistoryV2.name, schema: TransactionHistorySchema },
        ]),
    ],
    providers: [TransactionHistoriesService,TransactionsService],
    exports: [TransactionHistoriesService],
})
export class TransactionHistoriesModule {}
