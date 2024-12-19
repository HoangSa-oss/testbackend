import { Module } from '@nestjs/common';
import { TopupService } from './topup.service';
import { TopupController } from './topup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantV2, MerchantSchema } from '@/entities/merchant.entity';
import { TopupV2, TopupSchema } from '@/entities/topup.entity';
import { MerchantService } from '../merchant/merchant.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MerchantV2.name, schema: MerchantSchema },
            { name: TopupV2.name, schema: TopupSchema },
        ]),
        
    ],
    controllers: [TopupController],
    providers: [TopupService, MerchantService,],
})
export class TopupModule {}
