import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { appSettings } from 'src/configs/appsettings';
import { OAuth2Strategy } from 'passport-google-oauth';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
    /**
     *
     */
    constructor() {
        super({
            clientID: appSettings.serviceProviders['google'].appId,
            clientSecret: appSettings.serviceProviders['google'].appSecret,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err: any, user: any, info?: any) => void,
    ) {
        const { name, emails, photos, id } = profile;
        const user = {
            email: emails[0].value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            avatar: photos[0].value,
            id,
        };
        const payload = { user, accessToken };
        done(null, payload);
    }
}
