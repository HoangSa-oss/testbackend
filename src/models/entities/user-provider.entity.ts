import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';

export type UserProviderDocument = UserProviderV2 & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserProviderV2.name)}s` })
export class UserProviderV2 extends AggregateRoot {
    constructor() {
        super();
        this._id = Types.ObjectId;
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop()
    providerName: string;

    @Prop()
    providerId: string;

    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;
}

export const UserProviderSchema = SchemaFactory.createForClass(UserProviderV2);
