import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AggregateRoot } from '../aggregate-root';
import { UserV2 } from './user.entity';
import { RoleV2 } from './role.entity';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import _ from 'lodash';
import { UserCodeV2 } from './user-code';

export type UserRoleDocument = UserRoleV2 & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserRoleV2.name)}s` })
export class UserRoleV2 extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: UserCodeV2.name })
    user: UserV2;

    @Prop({ type: Types.ObjectId, ref: RoleV2.name })
    role: RoleV2;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRoleV2);
