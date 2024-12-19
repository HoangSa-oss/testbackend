import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/apis/auth/auth.service';
import { UserLogin } from 'src/apis/auth/dto/user-login.dto';
import { UsersService } from 'src/apis/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     *
     */
    constructor(
        private authService: AuthService,
        private readonly usersService: UsersService,
    ) {
        super();
    }

    async validate(userName: string, password: string) {
        const user = await this.authService.validateUser(userName, password);
        if (!user) {
            return undefined;
        }

        const permissions = await this.usersService.getPermissionAsync(
            user._id,
        );

        const result: UserLogin = {
            user_id: user._id,
            user_name: user.user_name,
            permissions: permissions,
        };
        return result;
    }
}
