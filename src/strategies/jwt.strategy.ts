import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/apis/users/users.service';
import { appSettings } from 'src/configs/appsettings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   *
   */
  constructor(
   
    
  ) {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appSettings.jwt.secret,
      issuer: appSettings.jwt.issuer,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      permissions: payload.permissions,
    };
  }
}
