import _ from 'lodash';
import { Types } from 'mongoose';
import { SeedDataModel } from '../seedMain';
import { TENANTS } from '../../constants/string-constants';
import { TenantV2 } from '../../models/entities/tenant.entity';

interface TenantModel {
    _id: Types.ObjectId;
    name: string;
    createdAt: Date;
}

const now = new Date();
const data: TenantModel[] = [
    {
        _id: new Types.ObjectId(TENANTS.ADMIN),
        name: 'Tenant Admin',
        createdAt: now,
    },
];

const SeederTenant: SeedDataModel = {
    data,
    collectionName: `${_.camelCase(TenantV2.name)}s`,
};

export default SeederTenant;
