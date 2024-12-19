import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';

export type UserTokenDocument = UserTokenV2 & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserTokenV2.name)}s` })
export class UserTokenV2 extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;

    @Prop()
    refreshToken: string;

    @Prop()
    deviceId: string;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserTokenV2);
