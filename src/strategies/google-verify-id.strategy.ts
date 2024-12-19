import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { appSettings } from 'src/configs/appsettings';
import { Strategy } from 'passport-google-verify-token';
import { google, Auth } from 'googleapis';

@Injectable()
export class GoogleVerifyIdTokenStrategy extends PassportStrategy(
    Strategy,
    'google-id-token',
) {
    oauthClient: Auth.OAuth2Client;
    /**
     *
     */
    constructor() {
        const { appId, appSecret, callbackUrl } =
            appSettings.serviceProviders['google'];
        super({
            clientID: appId,
        });
        this.oauthClient = new google.auth.OAuth2(appId, appSecret);
    }

    async validate(
        user: any,
        clientID: string | [],
        done: (err: any, user: any, info?: any) => void,
    ) {
        const { payload } = user;
        done(null, payload);
    }

    async verifyGoogleToken(
        idToken: string,
        clientID: string | [],
        done: (...args: any[]) => void,
    ) {
        try {
            const tokenInfo = await this.oauthClient.verifyIdToken({
                idToken: idToken,
                audience: appSettings.serviceProviders['google'].appId,
            });
            done(null, tokenInfo);
        } catch (error) {
            console.error('error', error);
            done(null, undefined);
        }
    }
}
