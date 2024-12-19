import { AssignRoleDto } from '../roles/dto/assign-role.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Req,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Authorize } from 'src/decorators/authorize.decorator';
import { BaseController } from '../base.controller';
import { UserSortBy } from '@/entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserPointDto } from './dto/user-point.dto';
import { Types } from 'mongoose';
import { PagingSortDto } from 'src/models/dtos/paging.dto';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { PermissionsRequired } from 'src/decorators/permissions.decorator';
import { Permissions } from '@/enums/permissions.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController extends BaseController {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
    ) {
        super();
    }

    // @Put('update_column')
    // async updateColumn() {
    //      await this.usersService.updateColumn();
    //      return true;
    // }

    @Post()
    @UseGuards(RolesGuard)
    @PermissionsRequired(
        (Permissions.GET_USER & Permissions.CREATE_USER) |
            Permissions.FULL_ADMIN,
    )
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const userRoleModel: AssignRoleDto = {
            userId: user.id,
            roleIds: Types.ObjectId[user.user_type],
        };

        await this.rolesService.assignRole(userRoleModel);
        return user._id;
    }
    @Post('verify-user')
    async verifyUser(@Query() token:string){
       return await this.usersService.verifyUser(token)
    }
    
    @Get()
    /* Start swagger*/
    @ApiQuery({ name: 'page', type: Number, required: false })
    @ApiQuery({ name: 'size', type: Number, required: false })
    @ApiQuery({ name: 'getAll', type: Boolean, required: false })
    @ApiQuery({ name: 'sort', type: () => "'asc' | 'desc'", required: false })
    @ApiQuery({
        name: 'sortBy',
        type: () => "'title' | 'createdAt'",
        required: false,
    })
    @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
    findAll(@Query() queryParams: PagingSortDto<UserSortBy>) {
        return this.usersService.findAll(queryParams);
    }

    @Get(':id')
    @Authorize('user_view')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Put('my-profile')
    @Authorize('user_update')
    async updateMyProfile(
        @Req() req,
        @Body() ppdateProfileDto: UpdateProfileDto,
    ) {
        const { userId } = req.user;

        return await this.usersService.updateProfile(userId, ppdateProfileDto);
    }

    @Put('point')
    @UseGuards(JwtAuthGuard)
    @Authorize('user_update')
    async sendPoint(@Body() userPointDto: UserPointDto, @Req() req) {
        const { userId } = req.user;
        const user = await this.usersService.findOne(userId);
        return await this.usersService.sendPoint(userPointDto, user);
    }

    @Put(':id')
    @Authorize('user_update')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete('multiple')
    @Authorize('user_delete')
    @ApiBody({ type: String, isArray: true })
    async deleteMultiple(@Body() userIds: string[]) {
        return await this.usersService.deleteMany(userIds);
    }

    @Delete(':id')
    @Authorize('user_delete')
    remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req) {
        const { userId } = req.user;
        const user = await this.usersService.findOne(userId);
        return user;
    }

    @Get('ref-code/:ref_code')
    async findUserByRefcode(@Param('ref_code') ref_code: string) {
        const user = await this.usersService.findUserByRefcode(ref_code);
        return user;
    }
}
