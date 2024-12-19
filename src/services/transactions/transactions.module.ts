import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TopupV2, TopupSchema } from '@/entities/topup.entity';
import { TransactionV2, TransactionSchema } from '@/entities/transaction.entity';
import {
    TransactionHistoryV2,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TransactionV2.name, schema: TransactionSchema },
            { name: TransactionHistoryV2.name, schema: TransactionHistorySchema },
            { name: TopupV2.name, schema: TopupSchema },
        ]),
    ],
    providers: [TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule {}
