import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Document, Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';

export type UserDeviceDocument = UserDeviceV2 & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserDeviceV2.name)}s` })
export class UserDeviceV2 extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop()
    deviceName: string;

    @Prop()
    ip: string;

    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;
}

export const UserDeviceSchema = SchemaFactory.createForClass(UserDeviceV2);
