import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/apis/users/users.service';
import { appSettings } from 'src/configs/appsettings';
import { Request } from '@nestjs/common';
import e from 'express';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    /**
     *
     */
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appSettings.jwt.secret,
            issuer: appSettings.jwt.issuer,
            passReqToCallback: true
        });
    }

    async validate(req: e.Request, payload: any) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        const user = await this.userService.findOne(payload.sub);
        if (!user) return undefined;
        const permissions = await this.userService.getPermissionAsync(
            payload.sub,
        );

        return {
            token,
            userId: payload.sub,
            user,
            permissions: permissions,
        };
    }

    // authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, options?: any): void {

    // }
}
