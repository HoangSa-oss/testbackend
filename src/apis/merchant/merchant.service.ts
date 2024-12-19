import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Merchant, MerchantSortBy } from '@/entities/merchant.entity';
import { PageResult, PagingSortDto } from '@/dtos/paging.dto';

@Injectable()
export class MerchantService {
    constructor(
        @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    ) {}

    async create(createMerchantDto: CreateMerchantDto) {
        const exist = await this.findOneByName(createMerchantDto.name);
        if (exist) {
            throw new BadRequestException('Merchant name is existed');
        }
        const model = new this.merchantModel(createMerchantDto);
        await this.merchantModel.updateOne({ _id: model._id }, model, {
            upsert: true,
            new: true,
        });
        return model.id;
    }

    async findAll(
        queryParams: PagingSortDto<MerchantSortBy>,
    ): Promise<PageResult<Merchant>> {
        const {
            size = 10,
            page = 1,
            getAll = false,
            sort = 'desc',
            sortBy = 'createdAt',
        } = queryParams;
        const projection = {
            $project: {
                _id: 1,
                name: 1,
                partnerCode: 1,
                partnerKey: 1,
                imageIcon: 1,
                shortName: 1,
                deleted: 1,
                topup: 1,
            },
        };
        let query = this.merchantModel
            .aggregate([
                // {
                //     $match: {
                //         user_type: {
                //             $ne: UserType.SuperAdmin,
                //         },
                //         deleted: false,
                //     },
                // },
                // {
                //     $lookup: {
                //         from: 'refcodes',
                //         localField: 'user_name',
                //         foreignField: 'email',
                //         as: 'ref_code_by',
                //     },
                // },
                projection,
            ])
            .sort({ [sortBy]: sort });

        const result: PageResult<Merchant> = {
            items: [],
        };

        const skip = queryParams.skip();
        if (!getAll) {
            result.total = await this.merchantModel.count();
            query = query.skip(skip).limit(size);
            result.page = page;
            result.pageSize = Math.ceil(result.total / size);
        }
        result.items = await query;
        return result;
    }

    async findOne(id: string) {
        return await this.merchantModel.findById(id);
    }

    async update(id: string, updateMerchantDto: UpdateMerchantDto) {
        const exist = await this.merchantModel.findOne({
            _id: { $ne: new Types.ObjectId(id) },
            name: updateMerchantDto.name,
        });
        if (exist) {
            throw new BadRequestException('Merchant name is existed');
        }
        const updatedResult = await this.merchantModel.updateOne(
            { _id: new Types.ObjectId(id) },
            updateMerchantDto,
            {
                upsert: false,
                new: false,
            },
        );
        return { modifiedCount: updatedResult.modifiedCount };
    }

    async remove(id: string) {
        const updatedResult = await this.merchantModel.updateOne(
            { _id: new Types.ObjectId(id) },
            { isActive: false },
            {
                upsert: false,
                new: false,
            },
        );
        return { modifiedCount: updatedResult.modifiedCount };
    }

    async findOneByName(name: string) {
        return await this.merchantModel.findOne({ name });
    }
}
