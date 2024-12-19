import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ default: 'old_password', type: String, required: false })
    oldPassword?: string;

    @ApiProperty({ default: 'new_password', type: String, required: true })
    newPassword: string;
}
