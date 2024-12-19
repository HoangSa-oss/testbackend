import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserV2, UserSchema } from '@/entities/user.entity';
import {MailService} from '../../services/mail/mail.service'
import {
    UserLoginV2,
    UserLoginSchema,
} from '../../models/entities/user-login.entity';
import {
    UserDeviceV2,
    UserDeviceSchema,
} from '../../models/entities/user-device.entity';
import {
    UserProviderV2,
    UserProviderSchema,
} from '../../models/entities/user-provider.entity';
import {
    UserTokenV2,
    UserTokenSchema,
} from '../../models/entities/user-token.entity';
import { UserRoleV2, UserRoleSchema } from '@/entities/user-role.entity';
import { RolesService } from '../roles/roles.service';
import { RoleV2, RoleSchema } from '@/entities/role.entity';
import { UserCodeV2, UserCodeSchema } from '../../models/entities/user-code';
import { TenantV2, TenantSchema } from '@/entities/tenant.entity';
import { MailModule } from 'src/services/mail/mail.module';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from 'src/apis/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { appSettings } from 'src/configs/appsettings';
@Module({
    imports: [
        JwtModule.register({
                    secret: appSettings.jwt.secret,
                    signOptions: {
                        expiresIn: appSettings.jwt.expireIn,
                        issuer: appSettings.jwt.issuer,
                    },
                }),
        MailModule,
        MongooseModule.forFeature([
            { name: UserV2.name, schema: UserSchema },
            { name: UserLoginV2.name, schema: UserLoginSchema },
            { name: UserDeviceV2.name, schema: UserDeviceSchema },
            { name: UserProviderV2.name, schema: UserProviderSchema },
            { name: UserTokenV2.name, schema: UserTokenSchema },
            { name: UserRoleV2.name, schema: UserRoleSchema },
            { name: RoleV2.name, schema: RoleSchema },
            { name: UserCodeV2.name, schema: UserCodeSchema },
            { name: TenantV2.name, schema: TenantSchema },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, RolesService],
    exports: [UsersService],
})
export class UsersModule {}
