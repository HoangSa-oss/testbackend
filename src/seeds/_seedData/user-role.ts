import _ from 'lodash';
import { Types } from 'mongoose';
import { ROLES, USERS } from '../../constants/string-constants';
import { UserRoleV2 } from '../../models/entities/user-role.entity';
import { SeedDataModel } from '../seedMain';

interface UserRoleModel {
    user: Types.ObjectId;
    role: Types.ObjectId;
    createdAt: Date;
}

const now = new Date();
const data: UserRoleModel[] = [
    {
        user: new Types.ObjectId(USERS.ADMIN_ID),
        role: new Types.ObjectId(ROLES.ADMIN),
        createdAt: now,
    },
    {
        user: new Types.ObjectId(USERS.USER_ID),
        role: new Types.ObjectId(ROLES.USER),
        createdAt: now,
    },
];

const SeederUserRole: SeedDataModel = {
    data,
    collectionName: `${_.camelCase(UserRoleV2.name)}s`,
};

export default SeederUserRole;
