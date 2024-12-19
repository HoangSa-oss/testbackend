import { Module } from '@nestjs/common';
import { TopupService } from './topup.service';
import { TopupController } from './topup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from '@/entities/merchant.entity';
import { Topup, TopupSchema } from '@/entities/topup.entity';
import { MerchantService } from '../merchant/merchant.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Merchant.name, schema: MerchantSchema },
            { name: Topup.name, schema: TopupSchema },
        ]),
        
    ],
    controllers: [TopupController],
    providers: [TopupService, MerchantService,],
})
export class TopupModule {}
