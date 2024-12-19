import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Topup, TopupSchema } from '@/entities/topup.entity';
import { Transaction, TransactionSchema } from '@/entities/transaction.entity';
import {
    TransactionHistory,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: TransactionHistory.name, schema: TransactionHistorySchema },
            { name: Topup.name, schema: TopupSchema },
        ]),
    ],
    providers: [TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule {}
