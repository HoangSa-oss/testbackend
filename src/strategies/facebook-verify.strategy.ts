import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { appSettings } from 'src/configs/appsettings';
import { Strategy } from 'passport-facebook-token-nest';

@Injectable()
export class FacebookVerifyStrategy extends PassportStrategy(
    Strategy,
    'facebook-token',
) {
    /**
     *
     */
    constructor() {
        const { appId, appSecret, callbackUrl } =
            appSettings.serviceProviders['facebook'];
        super({
            clientID: appId,
            clientSecret: appSecret,
            callbackURL: callbackUrl,
            // authorizationURL: 'http://localhost:3000/auth/facebook/token',
            // tokenURL: 'http://localhost:3000/auth/facebook/token',
            scope: 'email',
            profileFields: ['emails', 'name'],
            fbGraphVersion: 'v3.0',
        });
    }

    async validate(
        accessToken,
        refreshToken,
        profile,
        done: (err: any, user: any, info?: any) => void,
    ) {
        done(null, profile);
    }
}
