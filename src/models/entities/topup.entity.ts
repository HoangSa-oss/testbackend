import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { Merchant } from './merchant.entity';

export type TopupDocument = Topup & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(Topup.name)}s` })
export class Topup extends AggregateRoot {
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

    @Prop({ type: Types.ObjectId, ref: Merchant.name })
    merchant: Merchant;
}

export const TopupSchema = SchemaFactory.createForClass(Topup);
