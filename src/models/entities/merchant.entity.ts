import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';
import { Types } from 'mongoose';
import { TopupV2 } from './topup.entity';

export type MerchantSortBy = 'name' | 'isActive' | 'partnerCode';
export type MerchantDocument = MerchantV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(MerchantV2.name)}s` })
export class MerchantV2 extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop()
    name: string;

    @Prop()
    partnerCode: string;

    @Prop()
    partnerKey: string;

    @Prop()
    imageIcon: string;

    @Prop()
    shortName: string;

    @Prop()
    deleted: boolean;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'topups' }] })
    topups: TopupV2[]; // Array of topup object IDs

    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;
}

export const MerchantSchema = SchemaFactory.createForClass(MerchantV2);
