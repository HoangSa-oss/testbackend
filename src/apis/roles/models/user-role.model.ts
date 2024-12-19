import { Types } from 'mongoose';
import { RoleV2 } from '@/entities/role.entity';
import { UserV2 } from '@/entities/user.entity';

export class UserRoleModel {
    user: UserV2 | Types.ObjectId;
    role: RoleV2 | Types.ObjectId;
}
