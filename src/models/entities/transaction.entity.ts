import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { TopupV2 } from './topup.entity';

export type TransactionDocument = TransactionV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(TransactionV2.name)}s` })
export class TransactionV2 extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    transactionRequest: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    userCustom: string;

    @Prop()
    refCode: string; // verify hook

    @Prop()
    orderNo: string; // verify hook

    @Prop()
    amount: number;

    @Prop()
    email: string;

    @Prop({ type: Types.ObjectId, ref: TopupV2.name })
    topup: TopupV2;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionV2);
