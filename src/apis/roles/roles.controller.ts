import { PERMISSIONS } from "../../constants/string-constants";
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags } from "@nestjs/swagger";
import { Authorize } from "src/decorators/authorize.decorator";
import { AssignRoleDto } from "./dto/assign-role.dto";

@Controller("roles")
@ApiTags("Roles")
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	@Authorize("role_create")
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.rolesService.create(createRoleDto);
	}

	@Get()
	@Authorize("role_view")
	findAll() {
		return this.rolesService.findAll();
	}

	@Get(":id")
	@Authorize("role_view")
	findOne(@Param("id") id: string) {
		return this.rolesService.findOne(+id);
	}

	@Put(":id")
	@Authorize("role_update")
	update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.rolesService.update(+id, updateRoleDto);
	}

	@Delete(":id")
	@Authorize("role_delete")
	remove(@Param("id") id: string) {
		return this.rolesService.remove(+id);
	}

	@Post("assign-role")
	@Authorize("role_assign")
	async asignRoleToUser(@Body() model: AssignRoleDto) {
		const result = await this.rolesService.assignRole(model);
		return result;
	}
}
