import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { Topup } from './topup.entity';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(Transaction.name)}s` })
export class Transaction extends AggregateRoot {
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

    @Prop({ type: Types.ObjectId, ref: Topup.name })
    topup: Topup;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
