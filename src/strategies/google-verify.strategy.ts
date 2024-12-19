import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { appSettings } from 'src/configs/appsettings';
import { Strategy } from 'passport-google-verify-token';
import { google, Auth } from 'googleapis';

@Injectable()
export class GoogleVerifyStrategy extends PassportStrategy(
    Strategy,
    'google-token',
) {
    oauthClient: Auth.OAuth2Client;
    /**
     *
     */
    constructor() {
        const { appId, appSecret, callbackUrl } =
            appSettings.serviceProviders['google'];
        const clientID = appId;
        const clientSecret = appSecret;
        super({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            scope: 'email',
            profileFields: ['emails', 'name'],
            audience: clientID,
        });
        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }

    async validate(
        user: string,
        clientID: string | [],
        done: (err: any, user: any, info?: any) => void,
    ) {
        const payload = { user };
        done(null, payload);
    }

    // async verifyGoogleToken(
    //     idToken: string,
    //     clientID: string | [],
    //     done: (...args: any[]) => void,
    // ) {
    //     try {
    //         const tokenInfo = await this.oauthClient.getTokenInfo(idToken);

    //         const payload = { user: tokenInfo };
    //         done(null, tokenInfo);
    //     } catch (error) {
    //         done(null, undefined);
    //     }
    // }
}
