import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';

export type UserLoginDocument = UserLoginV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(UserLoginV2.name)}s` })
export class UserLoginV2 extends AggregateRoot {
    constructor() {
        super();
        this._id = Types.ObjectId;
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;

    @Prop()
    loginTime: string;

    @Prop()
    deviceId: string;

    @Prop()
    providerId: string;

    @Prop()
    logOutTime: string;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLoginV2);
