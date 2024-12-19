import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';

export type UserTokenDocument = UserToken & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserToken.name)}s` })
export class UserToken extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop()
    refreshToken: string;

    @Prop()
    deviceId: string;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
