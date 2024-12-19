import { BadRequestException, Injectable, Ip, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDeviceDto } from '../users/dto/create-user-device.dto';
import { CreateUserProviderDto } from '../users/dto/create-user-provider.dto';
import { appSettings } from '../../configs/appsettings';
import { UserLogin } from './dto/user-login.dto';
import { CreateUserTokenDto } from '../users/dto/create-user-token.dto';
import { CodeType, Status } from '../../constants/enums';
import { CreateUserModel } from '../users/models/create-user.model';
import { MailService } from 'src/services/mail/mail.service';
import { UserVerify } from './dto/user-verifgy.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService:MailService
    ) {}

    async validateUser(username: string, password: string) {
        
        if (!username || !password) {
            throw new BadRequestException('Username or password incorrectly');
        }

        const user = await this.usersService.findUserByUsername(
            username.trim(),
        );
        if (!user) {
            throw new BadRequestException('Username or password incorrectly');
        }
        const isMatch = user && (await bcrypt.compare(password, user.password));

        if (isMatch) {
            return user;
        }
        throw new BadRequestException('Username or password incrrect');
    }


    async getTokens(payload) {
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: payload.sub,
            },
            {
                expiresIn: appSettings.jwt.refreshExpireIn,
            },
        );
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            expiresIn: new Date().setTime(new Date().getTime() + parseInt(process.env.EXPIRE_IN)),
            accessToken,
            refreshToken,
        };
    }

    async login(user: UserLogin, device: string) {
        const payload = {
            user_name: user.user_name,
            sub: user.user_id,
            permissions: user.permissions,
        };
        const result = await this.getTokens(payload);
        const userModel = await this.usersService.findOne(
            user.user_id.toString(),
        );
        const {id,user_name,email,street,city} = userModel
        if (!userModel) {
            throw new BadRequestException(
                'User not found',
                `id ${user.user_id} not found.`,
            );
        }
        if(userModel.is_verify_email==false){
            await this.mailService.sendUserConfirmation({user_name,email,id})
            throw new UnauthorizedException(
                'User not confirm email, Please check mail'
            )     
        }
        const userTokenDto: CreateUserTokenDto = {
            refreshToken: result.refreshToken,
            deviceId: device,
            user: userModel,
        };
        await this.usersService.createUserTokenAsync(userTokenDto);
        return {user:{user_name,email},token:{...result}}
    }
    async logout(userTokenDto:CreateUserTokenDto){
        const data =  await this.usersService.DeleteUserTokenAsync(userTokenDto)
        if(data.deletedCount==1){
            return "Logout success"
        }else{
            throw new BadRequestException('User not found')
        }
    }
    // async loginGoogleUser(
    //     user: any,
    //     values: {
    //         userAgent: string;
    //         ipAddress: string;
    //     },
    // ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    //     const {
    //         email,
    //         sub: user_name,
    //         picture,
    //         given_name: full_name,
    //         email_verified,
    //         street,
    //         city,
    //         state,
    //         zip_code,
    //         user_type,
    //         company
    //     } = user;
    //     const userDto: CreateUserModel = {
    //         user_name: user_name,
    //         password: null,
    //         email: email,
    //         company:company,
    //         is_verify_email: email_verified,
    //         full_name: full_name,
    //         phone: null,
    //         avatar: picture,
    //         status: Status.ACTIVE,
    //         street: street,
    //         city: city,
    //         state: state,
    //         zip_code: zip_code,
    //         user_type: user_type,
    //     };

    //     const userExist = await this.usersService.findOneByUsername(user_name);
    //     const userlogin: UserLogin = {
    //         permissions: [],
    //         user_name: userExist?.user_name,
    //         user_id: userExist?._id,
    //     };

    //     const userDeviceDto: CreateUserDeviceDto = {
    //         deviceName: values.userAgent,
    //         ip: values.ipAddress,
    //         user: userExist?._id,
    //     };

    //     const userProviderDto: CreateUserProviderDto = {
    //         providerId: user_name,
    //         providerName: 'google',
    //         user: userExist?._id,
    //     };

    //     if (!userExist) {
    //         const userCreated = await this.usersService.create(userDto);

    //         userlogin.user_name = userCreated.user_name;
    //         userlogin.user_id = userCreated._id;
    //         userDeviceDto.user = userCreated._id;
    //         userProviderDto.user = userCreated._id;
    //     }

    //     const userDeviceCreated = await this.usersService.createUserDeviceAsync(
    //         userDeviceDto,
    //     );
    //     const userProviderCreated =
    //         await this.usersService.createUserProviderAsync(userProviderDto);
    //     const device = `${values.userAgent}_${values.ipAddress}`;
    //     const result = await this.login(userlogin, device);

    //     return result;
    // }

    // async loginFacebookUser(
    //     user: any,
    //     values: {
    //         userAgent: string;
    //         ipAddress: string;
    //     },
    // ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    //     const {
    //         email,
    //         id: user_name,
    //         last_name,
    //         first_name,
    //         middle_name,
    //         street,
    //         city,
    //         state,
    //         zip_code,
    //         user_type,
    //         company

    //     } = user._json;
    //     const avatar = user.photos[0].value;
    //     const userDto: CreateUserModel = {
    //         user_name: user_name,
    //         password: null,
    //         email: email,
    //         is_verify_email: true,
    //         full_name: `${last_name} ${middle_name} ${first_name}`,
    //         phone: null,
    //         company: company,
    //         avatar: avatar,
    //         status: Status.ACTIVE,
    //         street: street,
    //         city: city,
    //         state: state,
    //         zip_code: zip_code,
    //         user_type: user_type,
    //     };

    //     const userExist = await this.usersService.findOneByUsername(user_name);
    //     const userlogin: UserLogin = {
    //         permissions: [],
    //         user_name: userExist?.user_name,
    //         user_id: userExist?._id,
    //     };

    //     const userDeviceDto: CreateUserDeviceDto = {
    //         deviceName: values.userAgent,
    //         ip: values.ipAddress,
    //         user: userExist?._id,
    //     };

    //     const userProviderDto: CreateUserProviderDto = {
    //         providerId: user_name,
    //         providerName: 'facebook',
    //         user: userExist?._id,
    //     };

    //     if (!userExist) {
    //         const userCreated = await this.usersService.create(userDto);

    //         userlogin.user_name = userCreated.user_name;
    //         userlogin.user_id = userCreated._id;
    //         userDeviceDto.user = userCreated._id;
    //         userProviderDto.user = userCreated._id;
    //     }

    //     const userDeviceCreated = await this.usersService.createUserDeviceAsync(
    //         userDeviceDto,
    //     );
    //     const userProviderCreated =
    //         await this.usersService.createUserProviderAsync(userProviderDto);
    //     const device = `${values.userAgent}_${values.ipAddress}`;
    //     const result = await this.login(userlogin, device);

    //     return result;
    // }
    // async verifyUser(token:string){
    //     const payload = this.jwtService.verifyAsync(token)
    //     console.log(payload)
    // }
    // async sendMailVerify(user_name:string,userId:string){
    //     const token = await this.getTokens(userId)
    //     const{accessToken} = token
    //     await this.mailService.sendUserConfirmation(user_name,accessToken)

    // }
    async changePasswordByCode(code: string, newPassword: string) {
        const user = await this.usersService.findUserByUserCode(
            code,
            CodeType.RESET_PASSWORD,
        );
        if (!user) {
            throw new BadRequestException(
                'User not found',
                `code ${code} not found.`,
            );
        }
        await this.changePassword(user.id, newPassword, null);
    }

    async forgotPasswordSendMail(email: string) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException(
                'User not found',
                `email ${email} not found.`,
            );
        }
        await this.mailService.sendEmailForgotPassword(email,user.id);
    }
    async forgotPassword(token: string, password: string) {
        try {
            const {sub} = await this.jwtService.verifyAsync(token)
            const{id} = sub
            await this.usersService.updatePassword(id,password)
        } catch  {
            throw new UnauthorizedException();
        }  
    }

    async sendEmailResetPassword(email: string, code: string) {
        console.log(`sendEmailResetPassword: ${email}_${code}`);
    }

    async changePassword(
        userId: any,
        newPassword: string,
        oldPassword: string | null,
    ) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new BadRequestException(
                'User not found',
                `id ${userId} not found.`,
            );
        }

        if (oldPassword) {
            console.log({ validOldPass: oldPassword });

            const validPassword = await user.matchPassword(oldPassword);
            if (!validPassword) {
                throw new BadRequestException('Password incorrectly');
            }
        }

        try {
            await this.usersService.updatePassword(user.id, newPassword);
        } catch (error: any) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
