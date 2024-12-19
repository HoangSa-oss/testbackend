import { UserCode } from './../../models/entities/user-code';
import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSortBy } from '@/entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserProviderDto } from './dto/create-user-provider.dto';
import { UserProvider } from '@/entities/user-provider.entity';
import { CreateUserDeviceDto } from './dto/create-user-device.dto';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserToken } from '@/entities/user-token.entity';
import { UserRole } from '@/entities/user-role.entity';
import { Status, UserType, CodeType } from '../../constants/enums';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RegisterUserDto } from '../auth/dto/user-create.dto';
import { UserPointDto } from './dto/user-point.dto';
import { appSettings } from 'src/configs/appsettings';
import { randomCharacter } from '../../extensions/function-helper';
import { UserDevice } from '@/entities/user-device.entity';
import { PageResult, PagingSortDto } from '@/dtos/paging.dto';
import { MailService } from 'src/services/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
    constructor(
        private mailService:MailService,
        private jwtService:JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserDevice.name)
        private userDeviceModel: Model<UserDevice>,
        @InjectModel(UserProvider.name)
        private userProviderModel: Model<UserProvider>,
        @InjectModel(UserToken.name) private userTokenModel: Model<UserToken>,
        @InjectModel(UserRole.name) private userRoleModel: Model<UserRole>,
        @InjectModel(UserCode.name) private userCodeModel: Model<UserCode>,
    ) {}
    async verifyUser(token:any){
        const {sub} = await this.jwtService.verifyAsync(token.token)
        const{user_id} = sub
        // const user = await this.userModel.findById(user_id)
        return await this.userModel.updateOne({_id:user_id},{is_verify_email:true})
    }
    async findUserByUsername(username: string) {
        if (!username) {
            return null;
        }
        const user = await this.userModel.findOne({ user_name: username });
        return user;
    }

    async findUserByEmail(email: string) {
        if (!email) {
            return null;
        }

        const user = await this.userModel.findOne({
            email: email,
        });

        return user;
    }

    async findUserByPhoneNumber(phone: string) {
        if (!phone) {
            return null;
        }
        const user = await this.userModel.findOne({ phone: phone });
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const userExist = await this.findUserByUsername(
            createUserDto.user_name,
        );
        if (userExist) {
            throw new BadRequestException('Username is exist');
        }

        const emailExist = await this.findUserByEmail(createUserDto.email);
        if (emailExist) {
            throw new BadRequestException('Email is exist');
        }

        const userExistPhone = await this.findUserByPhoneNumber(
            createUserDto.phone,
        );
        if (userExistPhone) {
            throw new BadRequestException('Phone number is exist');
        }

        const userModel = new this.userModel({
            ...createUserDto,
            status: Status.ACTIVE,
            is_verify_email: false,
            ref_code: Math.random().toString(36).slice(2, 8).toUpperCase(),
            street: null,
            city: null,
            zip_code: null,
            passport_number: null,
        });

        // const newUser = await this.userModel.create(userModel);
        await this.userModel.updateOne({ _id: userModel._id }, userModel, {
            upsert: true,
            new: true,
        });
        return userModel;
    }

    async registerUser(createUserDto: RegisterUserDto): Promise<User> {
        const userExist = await this.findUserByUsername(
            createUserDto.user_name,
        );
        if (userExist) {
            throw new BadRequestException('Username is exist');
        }

        const emailExist = await this.findUserByEmail(createUserDto.email);
        if (emailExist) {
            throw new BadRequestException('Email is exist');
        }

        const userExistPhone = await this.findUserByPhoneNumber(
            createUserDto.phone,
        );
        if (userExistPhone) {
            throw new BadRequestException('Phone number is exist');
        }
        const userModel = new this.userModel({
          
            user_type: UserType.User,
            status: Status.ACTIVE,
            ref_code: Math.random().toString(36).slice(2, 8).toUpperCase(),
            street: null,
            city: null,
            phone:null,
            company:null,
            zip_code: null,
            passport_number: null,
            ...createUserDto,
            is_verify_email: false,

        });
        const newUser = await this.userModel.create(userModel);
        await this.userModel.updateOne({ _id: userModel._id }, userModel, {
            upsert: true,
            new: true,
        });
        const {user_name,id} = newUser
        await this.mailService.sendUserConfirmation({user_name,id})
        return userModel.id;
    }
    
    async findAll(
        queryParams: PagingSortDto<UserSortBy>,
    ): Promise<PageResult<User>> {
        const {
            size = 10,
            page = 1,
            getAll = false,
            sort = 'desc',
            sortBy = 'createdAt',
        } = queryParams;

        let query = this.userModel
            .aggregate([
                {
                    $match: {
                        user_type: {
                            $ne: UserType.SuperAdmin,
                        },
                        deleted: false,
                    },
                },
                {
                    $lookup: {
                        from: 'refcodes',
                        localField: 'user_name',
                        foreignField: 'email',
                        as: 'ref_code_by',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        user_name: 1,
                        password: 0,
                        full_name: 1,
                        phone: 1,
                        email: 1,
                        user_type: 1,
                        avatar: 1,
                        status: 1,
                        point: 1,
                        ref_code: 1,
                        createdAt: 1,
                    },
                },
            ])
            .sort({ [sortBy]: sort });

        const result: PageResult<User> = {
            items: [],
        };

        const skip = queryParams.skip();
        if (!getAll) {
            result.total = await this.userModel.count();
            query = query.skip(skip).limit(size);
            result.page = page;
            result.pageSize = Math.ceil(result.total / size);
        }
        result.items = await query;
        return result;
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if (updateUserDto.email) {
            const userExist = await this.userModel.findOne({
                _id: { $ne: userObjectId },
                email: updateUserDto.email,
            });
            if (userExist) {
                throw new BadRequestException('Email does not exist');
            }
        }

        const userUpdated = await this.userModel.updateOne(
            { _id: userObjectId },
            updateUserDto,
        );

        return {
            modifiedCount: userUpdated.modifiedCount,
            matchedCount: userUpdated.matchedCount,
            upsertedCount: userUpdated.upsertedCount,
        };
    }

    async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const userExist = await this.userModel.findOne({
            _id: userObjectId,
        });

        if (!userExist) {
            throw new BadRequestException('User does not exist');
        }

        if (updateProfileDto.email) {
            const emailExist = await this.userModel.findOne({
                _id: { $ne: userObjectId },
                email: updateProfileDto.email,
            });

            if (emailExist) {
                throw new BadRequestException('Email exist');
            }
        }

        const userUpdated = await this.userModel.updateOne(
            { _id: userObjectId },
            updateProfileDto,
        );

        return {
            modifiedCount: userUpdated.modifiedCount,
            matchedCount: userUpdated.matchedCount,
            upsertedCount: userUpdated.upsertedCount,
        };
    }

    async delete(userId: string) {
        if (userId === process.env.USER_ADMIN_ID) {
            throw new BadRequestException('Cannot delete this user');
        }

        const user = await this.userModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(userId) },
            {
                deleted: true,
            },
        );

        return {
            id: user.id,
        };
    }

    async deleteMany(userIds: string[]) {
        const userIdsObject = userIds
            .filter((x) => x !== process.env.USER_ADMIN_ID)
            .map((x) => new mongoose.Types.ObjectId(x));
        const result = await this.userModel.updateMany(
            { _id: { $in: userIdsObject } },
            { deleted: true },
        );

        return {
            modifiedCount: result.modifiedCount,
        };
    }

    async findOne(userId: string): Promise<User | undefined> {
        return await this.userModel.findById(userId);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username });
    }

    async createUserProviderAsync(userProviderDto: CreateUserProviderDto) {
        const providerExist = await this.userProviderModel.exists(
            userProviderDto,
        );
        if (providerExist?._id) {
            return;
        }

        const createUserProvider = new this.userProviderModel(userProviderDto);
        return createUserProvider.save();
    }

    async createUserDeviceAsync(userDeviceDto: CreateUserDeviceDto) {
        const deviceExist = await this.userDeviceModel.findOne({
            deviceName: userDeviceDto.deviceName,
            ip: userDeviceDto.ip,
            user: userDeviceDto.user,
        });
        if (deviceExist) {
            return;
        }
        const createUserDevice = new this.userDeviceModel(userDeviceDto);
        return createUserDevice.save();
    }

    async createUserTokenAsync(userTokenDto: CreateUserTokenDto) {
        const query = {
            deviceId: userTokenDto.deviceId,
            user: userTokenDto.user._id,
            refreshToken:userTokenDto.refreshToken
        };
        
        const userTokenExist = await this.userTokenModel.findOne(query);

        if (userTokenExist) {
            userTokenExist.refreshToken = userTokenDto.refreshToken;
            return userTokenExist.save();
        }

        const createUserToken = new this.userTokenModel(userTokenDto);
        return createUserToken.save();
    }
    async findUserTokenAsync(userTokenDto: CreateUserTokenDto) {
        const query = {
            deviceId: userTokenDto.deviceId,
            user: userTokenDto.user,
            refreshToken:userTokenDto.refreshToken

        };
        const userTokenExist = await this.userTokenModel.findOne(query,'user deviceId refreshToken');
        return userTokenExist;
    }
    async DeleteUserTokenAsync(userTokenDto: CreateUserTokenDto) {
        const query = {
            deviceId: userTokenDto.deviceId,
            user: userTokenDto.user,
            refreshToken:userTokenDto.refreshToken

        };
        const userTokenDelete = await this.userTokenModel.deleteOne(query);
        return userTokenDelete;
    }
    async getPermissionAsync(userId: string) {
        const queryUserRole = {
            userId: new mongoose.Types.ObjectId(userId),
        };

        const userRoles = await this.userRoleModel.find(queryUserRole).populate('role');
        const roleIds = userRoles.map((x) => x.role);
        const permissionIds = roleIds.map((x) => x?.permission);

        return permissionIds;
    }

    async sendPoint(userPointDto: UserPointDto, user: User) {
        return;
    }

    async updateColumn() {
        await this.userModel.updateMany(
            {},
            {
                $set: {
                    ref_code: Math.random()
                        .toString(36)
                        .slice(2, 8)
                        .toUpperCase(),
                },
            },
        );
        return;
    }

    async findUserByRefcode(refCode: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ ref_code: refCode });
        return user;
    }

    async findUserByUserCode(code: string, type: CodeType) {
        const userCode = await this.userCodeModel.findOne({
            code: code,
            type: type.toString(),
            used: false,
        });
        if (!userCode) {
            throw new BadRequestException(`user code ${code} not found`);
        }

        const now = Date.now();
        if (userCode.expireTime < now) {
            throw new BadRequestException(`user code expired`);
        }

        const userId = userCode.user._id;
        userCode.used = true;
        await userCode.save();
        return await this.findOne(userId);
    }

    async createUserCode(user: User, type: string) {
        const code = randomCharacter(6);
        const now = Date.now();
        const expireTime = now + appSettings.codeExpired;

        const userCodeExist = await this.userCodeModel.findOne({
            user: user._id,
            type,
        });
        if (userCodeExist) {
            userCodeExist.code = code;
            userCodeExist.expireTime = expireTime;
            userCodeExist.used = false;
            userCodeExist.save();
            return code;
        }

        const userCodeModel = new this.userCodeModel({
            user,
            code,
            expireTime,
            type,
            used: false,
        });

        await this.userCodeModel.create(userCodeModel);
        return code;
    }

    async updatePassword(userId: string, password: string) {
        await this.userModel.updateOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { password: password },
        );
    }
}
