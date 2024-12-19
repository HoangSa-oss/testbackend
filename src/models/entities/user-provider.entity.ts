import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';

export type UserProviderDocument = UserProvider & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserProvider.name)}s` })
export class UserProvider extends AggregateRoot {
    constructor() {
        super();
        this._id = Types.ObjectId;
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop()
    providerName: string;

    @Prop()
    providerId: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;
}

export const UserProviderSchema = SchemaFactory.createForClass(UserProvider);
