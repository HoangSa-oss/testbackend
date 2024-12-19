/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AggregateRoot } from '../aggregate-root';
import { Document, model, Types } from 'mongoose';
import { USERS } from '../../constants/string-constants';
import _ from 'lodash';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { Status, UserType } from '../../constants/enums';
import { TenantV2 } from './tenant.entity';

export type UserSortBy = 'email' | 'fullName' | 'userType' | 'status';
export type UserDocument = UserV2 & Document;

@Schema({ timestamps: true, collection: `${_.camelCase(UserV2.name)}s` })
export class UserV2 extends AggregateRoot {
    constructor() {
        super();
    }

    @Prop({ trim: true })
    user_name: string;

    @Prop({ trim: true })
    password: string;

    @Prop({ trim: true })
    email: string;

    @Prop({ default: false })
    is_verify_email: boolean;

    @Prop({ trim: true })
    full_name: string;

    @Prop()
    phone: string;

    @Prop()
    company: string;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop()
    street: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    zip_code: Date;

    @Prop()
    user_type: UserType; // 'SYSTEM_ADMIN | ADMIN | USER'

    @Prop()
    avatar: string; // 'SYSTEM_ADMIN | ADMIN | USER'

    @Prop()
    status: Status;

    @Prop({ default: false })
    deleted: boolean;

    @Prop({ default: 0 })
    point: number; // reward points

    @Prop()
    ref_code: string; // refCode 6 character

    @Prop({ default: false })
    is_ref_code: boolean;

    @Prop({ default: 1 })
    remaining_cashback: number;

    @Prop({ type: Types.ObjectId, ref: TenantV2.name })
    tenant: TenantV2;

    isSuperAdmin: Function;
    hashPassword: Function;
    matchPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(UserV2);
export const UserModel = model<UserV2>('userV2s', UserSchema);

const hashPassword = async (password: string) => {
    try {
        if (!password) {
            return null;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    } catch (error) {
        console.log(error);

        throw new BadRequestException(
            'hash_password_error',
            JSON.stringify(error),
        );
    }
};

UserSchema.methods.isSuperAdmin = function () {
    return this._id?.toString() === USERS.ADMIN_ID;
};

// UserSchema.methods.hashPassword = async function () {
//     const passwordHash = await hashPassword(this.password);
//     this.password = passwordHash;
// };

UserSchema.methods.matchPassword = async function (newPassword: string) {
    return await bcrypt.compare(newPassword, this.password);
};

UserSchema.pre('save', async function (next) {
    if (!this.password) {
        next();
        return;
    }
    const passwordHash = await hashPassword(this.password);
    this.password = passwordHash;
    next();
});

UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user: any = this;
    const data = user.getUpdate();

    const docToUpdate = await user.model.findOne(user.getQuery());

    if (data.password && data.password !== _.get(docToUpdate, 'password', '')) {
        data.password = await hashPassword(data.password);
    }

    next();
});

UserSchema.pre(['find', 'count', 'findOne'], function () {
    this.where({ $or: [{ deleted: { $exists: false } }, { deleted: false }] });
});
