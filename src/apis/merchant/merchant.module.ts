import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { Merchant, MerchantSchema } from '@/entities/merchant.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Merchant.name, schema: MerchantSchema },
        ]),
    ],
    controllers: [MerchantController],
    providers: [MerchantService],
    exports: [MerchantService],
})
export class MerchantModule {}
