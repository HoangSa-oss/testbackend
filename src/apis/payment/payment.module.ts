import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@/entities/transaction.entity';
import {
    TransactionHistory,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { Merchant, MerchantSchema } from '@/entities/merchant.entity';
import { Topup, TopupSchema } from '@/entities/topup.entity';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LocalStrategy } from '../../strategies/local.strategy';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: TransactionHistory.name, schema: TransactionHistorySchema },
            { name: Merchant.name, schema: MerchantSchema },
            { name: Topup.name, schema: TopupSchema },
        ]),
    ],
    controllers: [PaymentController],
    providers: [
        JwtStrategy,
    
        PaymentService,
        TransactionsService,
        TransactionHistoriesService,
    ],
})
export class PaymentModule {}
