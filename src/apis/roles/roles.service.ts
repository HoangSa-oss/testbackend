import { AssignRoleDto } from './dto/assign-role.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoleV2 } from '@/entities/role.entity';
import { UserRoleV2 } from '@/entities/user-role.entity';
import { UserV2 } from '@/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRoleModel } from './models/user-role.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(RoleV2.name) private roleModel: Model<RoleV2>,
        @InjectModel(UserRoleV2.name) private userRoleModel: Model<UserRoleV2>,
        @InjectModel(UserV2.name) private userModel: Model<UserV2>, // private readonly userService: UsersService,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<RoleV2> {
        const createRole = new this.roleModel(createRoleDto);
        return createRole.save();
    }

    async findAll(): Promise<RoleV2[]> {
        return this.roleModel.find().exec();
    }

    findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    async findOneByUser(userId: string) {
        const userRole = await this.userRoleModel.findOne({user: new Types.ObjectId(userId)}).populate('role');
        return userRole.role;
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }

    async findRolesByIds(roleIds: Types.ObjectId[]) {
        return await this.roleModel.find({ _id: { $in: roleIds } });
    }

    async removeUserRoleByUser(userId: Types.ObjectId) {
        await this.userRoleModel.deleteMany({ user: userId });
    }

    async assignRole(model: AssignRoleDto) {
        const user = await this.userModel.findById(
            new Types.ObjectId(model.userId),
        );
        if (!user) {
            throw new BadRequestException(
                'User not found',
                `Id ${model.userId} not found`,
            );
        }

        if (user.isSuperAdmin()) {
            throw new BadRequestException('Cannot edit super admin');
        }
        const roles = await this.findRolesByIds(model.roleIds);
        const userRolesModel: UserRoleModel[] = roles.map((role) => {
            return {
                user,
                role,
            };
        });
        await this.removeUserRoleByUser(user._id);
        await this.userRoleModel.insertMany(userRolesModel);
        return true;
    }
}
