import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AggregateRoot } from '../aggregate-root';
import { Document, Types } from 'mongoose';
import _ from 'lodash';
import { Status } from '../../constants/enums';
import { User } from './user.entity';

export type UserConfigDocument = UserConfig & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(UserConfig.name)}s` })
export class UserConfig extends AggregateRoot {
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop()
    key: string;

    @Prop()
    value: string;

    @Prop()
    status: Status;
}

export const UserConfigSchema = SchemaFactory.createForClass(UserConfig);
