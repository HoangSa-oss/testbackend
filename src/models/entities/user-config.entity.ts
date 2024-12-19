import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AggregateRoot } from '../aggregate-root';
import { Document, Types } from 'mongoose';
import _ from 'lodash';
import { Status } from '../../constants/enums';
import { UserV2 } from './user.entity';

export type UserConfigDocument = UserConfigV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(UserConfigV2.name)}s` })
export class UserConfigV2 extends AggregateRoot {
    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;

    @Prop()
    key: string;

    @Prop()
    value: string;

    @Prop()
    status: Status;
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfigV2);
