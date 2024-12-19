import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import { ROLES } from 'src/constants/string-constants';

export class UpdateProfileDto {
    @ApiProperty({ default: 'your name', type: String})
    full_name?: string;

    @ApiProperty({ default: 'phone', type: String})
    phone?: string;

    @ApiProperty({
        default: 'youremail@gmail.com',
        type: String,
        required: false,
    })
    @IsEmail()
    email?: string;

    // @ApiProperty({
    //     default: 'your new password',
    //     type: String,
    //     required: false,
    // })
    // password?: string;

    // @ApiProperty({
    //     default: 'your old password',
    //     type: String,
    //     required: false,
    // })
    // old_password?: string;

    // @ApiProperty({
    //     default: '',
    //     type: String,
    //     required: false,
    // })
    // avatar?: string;

    // @ApiProperty({ enum: ROLES, default: ROLES.USER })
    // @IsEnum(ROLES, {
    //     message: `Status must be a valid enum ${ROLES.USER} | ${ROLES.ADMIN} | ${ROLES.OPERATOR}`,
    // })
    // user_type: string;
}
