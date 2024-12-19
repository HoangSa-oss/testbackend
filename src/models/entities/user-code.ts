import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { CodeType } from 'src/constants/enums';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';

// user code use by check reset password or something when change info
@Schema({ timestamps: true, collection: `${_.camelCase(UserCodeV2.name)}s` })
export class UserCodeV2 extends AggregateRoot {
    @Prop({ type: Types.ObjectId, ref: UserV2.name })
    user: UserV2;

    @Prop()
    type: CodeType;

    @Prop()
    code: string;

    @Prop()
    expireTime: number;

    @Prop()
    used: boolean;
}

export const UserCodeSchema = SchemaFactory.createForClass(UserCodeV2);
