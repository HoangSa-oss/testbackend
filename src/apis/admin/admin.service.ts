import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { User } from '@/entities/user.entity';
import { Role } from '@/entities/role.entity';
import { Permissions } from '@/enums/permissions.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from '@/entities/tenant.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

    async switchTenant(superAdmin: User, role: Role, targetTenantId: string) {
        if (role.permission & Permissions.FULL_ADMIN) {
            const tenant = await this.tenantModel.findById(targetTenantId);
            if (tenant) {
                // Simulate SUPER ADMIN acting within the context of the target tenant
                superAdmin.tenant = tenant._id;
                return tenant;
            }
        }
        throw new Error('Access denied');
    }

    create(createAdminDto: CreateAdminDto) {
        return 'This action adds a new admin';
    }

    findAll() {
        return `This action returns all admin`;
    }

    findOne(id: number) {
        return `This action returns a #${id} admin`;
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return `This action updates a #${id} admin`;
    }

    remove(id: number) {
        return `This action removes a #${id} admin`;
    }
}
