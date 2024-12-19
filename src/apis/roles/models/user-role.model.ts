import { Types } from 'mongoose';
import { Role } from '@/entities/role.entity';
import { User } from '@/entities/user.entity';

export class UserRoleModel {
    user: User | Types.ObjectId;
    role: Role | Types.ObjectId;
}
