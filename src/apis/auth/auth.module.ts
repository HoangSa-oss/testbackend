import { Module } from '@nestjs/common';
import { UsersModule } from 'src/apis/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { appSettings } from 'src/configs/appsettings';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { FacebookStrategy } from 'src/strategies/facebook.strategy';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { GoogleVerifyStrategy } from 'src/strategies/google-verify.strategy';
import { FacebookVerifyStrategy } from 'src/strategies/facebook-verify.strategy';
import { GoogleVerifyIdTokenStrategy } from '../../strategies/google-verify-id.strategy';
import { RefreshTokenStrategy } from 'src/strategies/refresh-token.strategy';
import { MailModule } from 'src/services/mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        MailModule,
        JwtModule.register({
            secret: appSettings.jwt.secret,
            signOptions: {
                expiresIn: appSettings.jwt.expireIn,
                issuer: appSettings.jwt.issuer,
            },
        }),
    ],

    providers: [
        AuthService,
     LocalStrategy,
     JwtStrategy,
    //  OidcStrategyFactory,
        SessionSerializer,
    //  FacebookStrategy,
    //  GoogleStrategy,
    //  GoogleVerifyStrategy,
    //  GoogleVerifyIdTokenStrategy,
    //  FacebookVerifyStrategy,
     RefreshTokenStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}