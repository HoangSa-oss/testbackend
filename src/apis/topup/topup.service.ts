import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopupDto } from './dto/create-topup.dto';
import { UpdateTopupDto } from './dto/update-topup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Topup } from '@/entities/topup.entity';
import { Model, Types } from 'mongoose';
import { MerchantService } from '../merchant/merchant.service';

@Injectable()
export class TopupService {
    constructor(
        @InjectModel(Topup.name) private topupModel: Model<Topup>,
        private merchantService: MerchantService,
    ) {}
    async create(createTopupDto: CreateTopupDto) {
        const merchant = await this.merchantService.findOne(
            createTopupDto.merchantId,
        );
        if (!merchant) {
            throw new BadRequestException('Merchant does not exist');
        }
        const topup = new this.topupModel({
            ...createTopupDto,
            merchant,
        });
        await this.topupModel.updateOne(
            {
                _id: topup._id,
            },
            topup,
            {
                new: true,
                upsert: true,
            },
        );
        return topup.id;
    }

    findAll() {
        return `This action returns all topup`;
    }

    findOne(id: string) {
        return `This action returns a #${id} topup`;
    }

    async findByMerchant(merchantId: string) {
        return await this.topupModel.find({
            merchant: new Types.ObjectId(merchantId),
            delete: false,
        });
    }

    async update(id: string, updateTopupDto: UpdateTopupDto) {
        const updatedResult = await this.topupModel.updateOne(
            { _id: new Types.ObjectId(id) },
            updateTopupDto,
            {
                upsert: false,
                new: false,
            },
        );
        return { modifiedCount: updatedResult.modifiedCount };
    }

    async remove(id: string) {
        const updatedResult = await this.topupModel.updateOne(
            { _id: new Types.ObjectId(id) },
            { deleted: true },
            {
                upsert: false,
                new: false,
            },
        );
        return { modifiedCount: updatedResult.modifiedCount };
    }
}
