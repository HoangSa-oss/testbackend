import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Document, Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';

export type UserDeviceDocument = UserDevice & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserDevice.name)}s` })
export class UserDevice extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop()
    deviceName: string;

    @Prop()
    ip: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;
}

export const UserDeviceSchema = SchemaFactory.createForClass(UserDevice);
