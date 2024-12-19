import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AggregateRoot } from '../aggregate-root';
import { User } from './user.entity';
import { Role } from './role.entity';
import { Types } from 'mongoose';
import { SYSTEM_ADMIN } from '../../constants/string-constants';
import _ from 'lodash';

export type UserRoleDocument = UserRole & Document;
@Schema({ timestamps: true, collection: `${_.camelCase(UserRole.name)}s` })
export class UserRole extends AggregateRoot {
    constructor() {
        super();
        this.createdBy = SYSTEM_ADMIN;
    }

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop({ type: Types.ObjectId, ref: Role.name })
    role: Role;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
