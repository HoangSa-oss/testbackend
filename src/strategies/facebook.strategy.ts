import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { appSettings } from 'src/configs/appsettings';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
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
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ) {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const payload = { user, accessToken };
        done(null, payload);
    }
}
