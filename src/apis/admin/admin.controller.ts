import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RolesService } from '../roles/roles.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private roleService: RolesService) {}

  @Post('switch-tenant')
  async switchTenant(@Req() req, @Body('tenantId') tenantId: string) {
    const user = req.user;
    const role = await this.roleService.findOneByUser(user.id);
    return this.adminService.switchTenant(user, role, tenantId);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
