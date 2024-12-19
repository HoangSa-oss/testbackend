import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantV2, TenantSchema } from '@/entities/tenant.entity';
import { UserV2, UserSchema } from '@/entities/user.entity';
import { UserRoleV2, UserRoleSchema } from '@/entities/user-role.entity';
import { RolesService } from '../roles/roles.service';
import { RoleV2, RoleSchema } from '@/entities/role.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TenantV2.name, schema: TenantSchema },
            { name: UserV2.name, schema: UserSchema },
            { name: UserRoleV2.name, schema: UserRoleSchema },
            { name: RoleV2.name, schema: RoleSchema },
            
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService, RolesService],
})
export class AdminModule {}
