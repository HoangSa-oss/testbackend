import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ default: 'user_name', type: String })
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ default: '*****', type: String })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ default: 'your name', type: String })
    full_name: string;

    @ApiProperty({ default: '09011111111', type: String, maximum: 12 })
    phone: string;

    @ApiProperty({ default: 'California', type: String, maximum: 500 })
    company: string;

    @ApiProperty({ default: 'email', type: String })
    @IsEmail()
    email: string;
}
