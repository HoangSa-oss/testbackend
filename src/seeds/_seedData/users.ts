import { Types } from 'mongoose';
import _ from 'lodash';
import { SeedDataModel } from '../seedMain';
import { TENANTS, USERS } from '../../constants/string-constants';
import { UserType } from '../../constants/enums';
import { User } from '../../models/entities/user.entity';

interface UserModel {
    _id: Types.ObjectId;
    user_name: string;
    password: string;
    email: string;
    is_verify_email: boolean;
    full_name: string;
    phone: string;
    nick_name?: string;
    gender?: string;
    walletAddress?: string;
    date_of_birth?: Date;
    user_type: string;
    avatar?: string;
    createdAt: Date;
    tenant: Types.ObjectId;
}

const now = new Date();
const data: UserModel[] = [
    {
        _id: new Types.ObjectId(USERS.ADMIN_ID),
        user_name: 'admin',
        password:
            '$2a$10$qlRx93wCxKMT0c7yyC5m8eRY1.6c3upLAl.mdqJqaUGNEpFCRQ072',
        email: 'admin@gmail.com',
        is_verify_email: true,
        full_name: 'admin',
        phone: '',
        createdAt: now,
        user_type: UserType.SuperAdmin,
        tenant: new Types.ObjectId(TENANTS.ADMIN),
        
    },
    {
        _id: new Types.ObjectId(USERS.USER_ID),
        user_name: 'user',
        password:
            '$2a$10$qlRx93wCxKMT0c7yyC5m8eRY1.6c3upLAl.mdqJqaUGNEpFCRQ072',
        email: 'user@gmail.com',
        is_verify_email: true,
        full_name: 'user',
        phone: '',
        createdAt: now,
        user_type: UserType.User,
        tenant: new Types.ObjectId(TENANTS.ADMIN),
    },
];

const SeederUser: SeedDataModel = {
    data,
    collectionName: `${_.camelCase(User.name)}s`,
};

export default SeederUser;
