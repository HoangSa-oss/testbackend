import { UserRoleV2, UserRoleSchema } from '@/entities/user-role.entity';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleV2, RoleSchema } from '@/entities/role.entity';
import { UserV2, UserSchema } from '@/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RoleV2.name, schema: RoleSchema }]),
        MongooseModule.forFeature([{ name: UserV2.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: UserRoleV2.name, schema: UserRoleSchema },
        ]),
    ],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
