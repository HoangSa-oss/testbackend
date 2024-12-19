import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class AssignRoleDto {
    @ApiProperty({ default: 'user id', type: String })
    userId: string;

    @ApiProperty({ type: Array<String> })
    roleIds: Types.ObjectId[];
}
