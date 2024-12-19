import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionV2, TransactionSchema } from '@/entities/transaction.entity';
import {
    TransactionHistoryV2,
    TransactionHistorySchema,
} from '@/entities/transaction-history.entity';
import { MerchantV2, MerchantSchema } from '@/entities/merchant.entity';
import { TopupV2, TopupSchema } from '@/entities/topup.entity';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LocalStrategy } from '../../strategies/local.strategy';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TransactionV2.name, schema: TransactionSchema },
            { name: TransactionHistoryV2.name, schema: TransactionHistorySchema },
            { name: MerchantV2.name, schema: MerchantSchema },
            { name: TopupV2.name, schema: TopupSchema },
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
