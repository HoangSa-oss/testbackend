import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { Types } from 'mongoose';
import { TransactionV2} from './transaction.entity';

export type TransactionHistoryDocument = TransactionHistoryV2 & Document;

@Schema({
    timestamps: true,
    collection: `${_.camelCase(TransactionHistoryV2.name)}s`,
})
export class TransactionHistoryV2 extends AggregateRoot {
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

    @Prop({ type: Types.ObjectId, ref: TransactionV2.name })
    transaction: TransactionV2;
}

export const TransactionHistorySchema =
    SchemaFactory.createForClass(TransactionHistoryV2);
