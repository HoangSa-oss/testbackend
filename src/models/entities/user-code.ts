import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { CodeType } from 'src/constants/enums';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';

// user code use by check reset password or something when change info
@Schema({ timestamps: true, collection: `${_.camelCase(UserCode.name)}s` })
export class UserCode extends AggregateRoot {
    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop()
    type: CodeType;

    @Prop()
    code: string;

    @Prop()
    expireTime: number;

    @Prop()
    used: boolean;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCode);
