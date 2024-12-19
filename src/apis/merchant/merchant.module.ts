import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MerchantV2, MerchantSchema } from '@/entities/merchant.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MerchantV2.name, schema: MerchantSchema },
        ]),
    ],
    controllers: [MerchantController],
    providers: [MerchantService],
    exports: [MerchantService],
})
export class MerchantModule {}
