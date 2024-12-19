import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { MerchantV2 } from './merchant.entity';

export type TopupDocument = TopupV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(TopupV2.name)}s` })
export class TopupV2 extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    name: string;

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop()
    promotion: number;

    @Prop()
    taxRate: number;

    @Prop()
    taxAmount: number;

    @Prop()
    amountAfterDiscount: number;

    @Prop()
    discountPercent: number;

    @Prop()
    bestDeal: boolean;

    @Prop({ type: Date })
    discountTime: Date;

    @Prop()
    sortOrder: number;

    @Prop()
    deleted: boolean;

    @Prop({ type: Types.ObjectId, ref: MerchantV2.name })
    merchant: MerchantV2;
}

export const TopupSchema = SchemaFactory.createForClass(TopupV2);
