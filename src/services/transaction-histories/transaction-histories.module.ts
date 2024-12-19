import { Module } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import {
    TransactionHistory,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { Transaction, TransactionSchema } from '@/entities/transaction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from '../transactions/transactions.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: TransactionHistory.name, schema: TransactionHistorySchema },
        ]),
    ],
    providers: [TransactionHistoriesService,TransactionsService],
    exports: [TransactionHistoriesService],
})
export class TransactionHistoriesModule {}
