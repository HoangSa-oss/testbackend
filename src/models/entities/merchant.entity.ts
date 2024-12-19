import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';
import { Types } from 'mongoose';
import { Topup } from './topup.entity';

export type MerchantSortBy = 'name' | 'isActive' | 'partnerCode';
export type MerchantDocument = Merchant & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(Merchant.name)}s` })
export class Merchant extends AggregateRoot {
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
    topups: Topup[]; // Array of topup object IDs

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
