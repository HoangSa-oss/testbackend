import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/entities/user.entity';
import {MailService} from '../../services/mail/mail.service'
import {
    UserLogin,
    UserLoginSchema,
} from '../../models/entities/user-login.entity';
import {
    UserDevice,
    UserDeviceSchema,
} from '../../models/entities/user-device.entity';
import {
    UserProvider,
    UserProviderSchema,
} from '../../models/entities/user-provider.entity';
import {
    UserToken,
    UserTokenSchema,
} from '../../models/entities/user-token.entity';
import { UserRole, UserRoleSchema } from '@/entities/user-role.entity';
import { RolesService } from '../roles/roles.service';
import { Role, RoleSchema } from '@/entities/role.entity';
import { UserCode, UserCodeSchema } from '../../models/entities/user-code';
import { Tenant, TenantSchema } from '@/entities/tenant.entity';
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
            { name: User.name, schema: UserSchema },
            { name: UserLogin.name, schema: UserLoginSchema },
            { name: UserDevice.name, schema: UserDeviceSchema },
            { name: UserProvider.name, schema: UserProviderSchema },
            { name: UserToken.name, schema: UserTokenSchema },
            { name: UserRole.name, schema: UserRoleSchema },
            { name: Role.name, schema: RoleSchema },
            { name: UserCode.name, schema: UserCodeSchema },
            { name: Tenant.name, schema: TenantSchema },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, RolesService],
    exports: [UsersService],
})
export class UsersModule {}
