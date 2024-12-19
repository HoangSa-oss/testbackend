import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';

export type UserLoginDocument = UserLogin & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(UserLogin.name)}s` })
export class UserLogin extends AggregateRoot {
    constructor() {
        super();
        this._id = Types.ObjectId;
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop()
    loginTime: string;

    @Prop()
    deviceId: string;

    @Prop()
    providerId: string;

    @Prop()
    logOutTime: string;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);
