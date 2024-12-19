import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {

    @ApiProperty({ default: 'email', type: String, required: true })
    @IsNotEmpty()
    password: string;
}
