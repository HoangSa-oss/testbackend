import _ from 'lodash';
import { Types } from 'mongoose';
import { RoleV2 } from '../../models/entities/role.entity';
import { SeedDataModel } from '../seedMain';
import { ROLES } from '../../constants/string-constants';
import { Permissions } from '../../models/enums/permissions.enum';

interface RoleModel {
    _id: Types.ObjectId;
    name: string;
    permission: number;
    createdAt: Date;
}

const now = new Date();
const data: RoleModel[] = [
    {
        _id: new Types.ObjectId(ROLES.ADMIN),
        name: 'Role Admin',
        permission:  Permissions.FULL_ADMIN,
        createdAt: now,
    },
    {
        _id: new Types.ObjectId(ROLES.OPERATOR),
        name: 'Role Operator',
        permission:  Permissions.FULL_OPERATOR,
        createdAt: now,
    },
    {
        _id: new Types.ObjectId(ROLES.USER),
        name: 'Role User',
        permission:  Permissions.GET_USER,
        createdAt: now,
    },
];

const SeederRole: SeedDataModel = {
    data,
    collectionName: `${_.camelCase(RoleV2.name)}s`,
};

export default SeederRole;
