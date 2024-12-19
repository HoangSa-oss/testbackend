import {
    Controller,
    HttpStatus,
    Get,
    Ip,
    Post,
    Req,
    UseGuards,
    Body,
    Query,
    Param,
    Put,
    ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { BaseController } from '../base.controller';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/user-create.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EMAIL } from 'src/constants/string-constants';
import { RefreshJwtAuthGuard } from 'src/guards/refresh-jwt-auth.guard';
import { CreateUserTokenDto } from '../users/dto/create-user-token.dto';

export type UserLoginReq = {
    username: string;
    password: string;
};

@Controller('auth')
@ApiTags('Auth')
export class AuthController extends BaseController {
    constructor(
        private authService: AuthService,
        private readonly usersService: UsersService,
    ) {
        super();
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Ip() ip) {
        if (!req.user) {
            return undefined;
        }

        const { user_name, user_id, permissions } = req.user;

        const userLogin: UserLogin = {
            user_name: user_name,
            user_id: user_id,
            permissions: permissions,
        };

        const device = `${req.get('User-Agent')}_${ip}`;
        return await this.authService.login(userLogin, device);
    }
    @Public()
    @UseGuards(RefreshJwtAuthGuard)
    @Post('logout')
    async logout(@Req() req, @Ip() ip) {
        const { user, userId, permissions,token } = req.user;
        const device = `${req.get('User-Agent')}_${ip}`;
        const userTokenDto: CreateUserTokenDto = {
                refreshToken: token,
                deviceId: device,
                user: user._id,
        };
        return await this.authService.logout(userTokenDto)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        return req.user;
    }

    // @Get('logout')
    // async logout(@Req() req, @Res() res: Response) {}

    @Get('facebook/redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookLoginRedirect(@Req() req: Request) {
        return req.user;
    }

    @Get('facebook/token')
    // @UseGuards(AuthGuard('facebook-token'))
    // async facebookVerify(@Req() req: Request) {
    //     const result = await this.authService.loginFacebookUser(req.user, {
    //         ipAddress: req.ip,
    //         userAgent: req.get('User-Agent'),
    //     });

    //     return result;
    // }

    // @Get('facebook')
    // @UseGuards(AuthGuard('facebook'))
    // async facebookLogin(): Promise<any> {
    //     return HttpStatus.OK;
    // }

    // @Get('google/redirect')
    // @UseGuards(AuthGuard('google'))
    // async googleLoginRedirect(@Req() req: any) {
    //     return req.user;
    // }

    // @Get('google/token')
    // @UseGuards(AuthGuard('google-token'))
    // async googleVerifyAccessToken(@Req() req: Request) {
    //     return {
    //         statusCode: HttpStatus.OK,
    //         data: req.user,
    //     };
    // }

    // @Get('google/id-token')
    // @UseGuards(AuthGuard('google-id-token'))
    // async googleVerifyIdToken(@Req() req: Request) {
    //     const result = await this.authService.loginGoogleUser(req.user, {
    //         ipAddress: req.ip,
    //         userAgent: req.get('User-Agent'),
    //     });

    //     return result;
    // }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('twitter/redirect')
    // @UseGuards(TwitterAuthGuard)
    @UseGuards(AuthGuard('twitter'))
    async twitterLoginRedirect(@Req() req: any) {
        return req.user;
    }

    @Get('twitter/token')
    // @UseGuards(AuthGuard('twitter-token'))
    @UseGuards(AuthGuard('twitter-token'))
    async twitterVerifyToken(@Req() req: Request) {
        return req.user;
    }

    @Get('twitter')
    @UseGuards(AuthGuard('twitter'))
    async twitterLogin(): Promise<any> {
        return HttpStatus.OK;
    }

    @Get('apple/token')
    // @UseGuards(AuthGuard('twitter-token'))
    @UseGuards(AuthGuard('apple-token'))
    async appleVerifyToken(@Req() req: Request) {
        return req.user;
    }

    @Get('auth0')
    @UseGuards(AuthGuard('auth0'))
    async auth0(@Req() req: Request) {
        return req.user;
    }

    @Post('refresh-token')
    @UseGuards(RefreshJwtAuthGuard)
    async refreshToken(@Req() req, @Ip() ip) {
        const { user, userId, permissions,token } = req.user;
        const device = `${req.get('User-Agent')}_${ip}`;
        const userTokenDto: CreateUserTokenDto = {
                refreshToken: token,
                deviceId: device,
                user: user._id,
        };
        const findUserToken = await this.usersService.findUserTokenAsync(userTokenDto)
        if(!findUserToken){
            throw new ForbiddenException('Access Denied')
        }
        const userLogin: UserLogin = {
            user_name: user.user_name,
            user_id: userId,
            permissions: permissions,
        };
        return await this.authService.login(userLogin, device);
    }

    @Public()
    @Post('register')
    async register(@Body() model: RegisterUserDto) {
        await this.usersService.registerUser(model);
    }
  
    // @Public()
    // @ApiParam({ name: 'email', type: String, required: true })
    // @Get('reset-password/:email')
    // async resetPassword(@Param('email') email: string) {
    //     return await this.authService.resetPassword(email);
    // }
    // @Post('verify')
    // async verify(@Body() model: {token:string}) {
    //     return await this.authService.verifyUser(model.token);
    // }

    @Public()
    @Post('forgot-password-send-mail')
    async forgotPasswordSendMail(@Body('email') email) {
        return this.authService.forgotPasswordSendMail(email)
        // return await this.authService.resetPassword(
        //     model.username,
        //     model.email,
        // );
    }
    @Public()
    @Post('forgot-password')
    async forgotPassword(@Query('token') token:string, @Body('password') password:ForgotPasswordDto) {
       
        return await this.authService.forgotPassword(token,password.password)
        // return await this.authService.resetPassword(
        //     model.username,
        //     model.email,
        // );
    }
   

    @Public()
    @ApiParam({ name: 'code', type: String, required: true })
    @Put('reset-password/:code')
    async changePasswordByCode(
        @Param('code') code: string,
        @Body() model: ChangePasswordDto,
    ) {
        return await this.authService.changePasswordByCode(
            code,
            model.newPassword,
        );
    }

    @Put('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() req, @Body() model: ChangePasswordDto) {
        const { userId } = req.user;
        return await this.authService.changePassword(
            userId,
            model.newPassword,
            model.oldPassword,
        );
    }
}
