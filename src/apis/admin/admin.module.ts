import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from '@/entities/tenant.entity';
import { User, UserSchema } from '@/entities/user.entity';
import { UserRole, UserRoleSchema } from '@/entities/user-role.entity';
import { RolesService } from '../roles/roles.service';
import { Role, RoleSchema } from '@/entities/role.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Tenant.name, schema: TenantSchema },
            { name: User.name, schema: UserSchema },
            { name: UserRole.name, schema: UserRoleSchema },
            { name: Role.name, schema: RoleSchema },
            
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService, RolesService],
})
export class AdminModule {}
