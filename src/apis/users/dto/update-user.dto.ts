import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { Status, UserType } from 'src/constants/enums';

export class UpdateUserDto {
    @ApiProperty({ default: false, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    is_verify_email?: boolean;

    @ApiProperty({ default: 'your name', type: String, required: false })
    @IsString()
    @IsOptional()
    full_name?: string;

    @ApiProperty({
        default: 'youremail@gmail.com',
        type: String,
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    // @ApiProperty({ default: 'your password', type: String, required: false })
    // @IsString()
    // @IsOptional()
    // password?: string;

    @ApiProperty({
        default: UserType.Operator,
        type: UserType,
        enum: [UserType.Operator, UserType.SystemAdmin, UserType.User],
        required: false,
    })
    @IsEnum(UserType)
    @IsOptional()
    user_type?: UserType;

    @ApiProperty({
        default: Status.ACTIVE,
        type: Status,
        enum: [Status.INACTIVE, Status.ACTIVE],
        required: false,
    })
    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}
