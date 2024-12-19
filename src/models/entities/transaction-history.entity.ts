import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { Transaction } from './transaction.entity';

export type TransactionHistoryDocument = TransactionHistory & Document;

@Schema({
    timestamps: true,
    collection: `${_.camelCase('TransactionHistories')}`,
})
export class TransactionHistory extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    responseCode: number;

    @Prop()
    message: string;

    @Prop()
    refCode: string;

    @Prop()
    orderNo: string;

    @Prop({ type: Types.ObjectId, ref: Transaction.name })
    transaction: string;
}

export const TransactionHistorySchema =
    SchemaFactory.createForClass(TransactionHistory);
