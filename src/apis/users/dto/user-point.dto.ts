import { ApiProperty } from '@nestjs/swagger';

export class UserPointDto {
    @ApiProperty({ default: 'username@gmail.com', type: String })
    username: string;

    @ApiProperty({ default: 0, type: Number })
    point: number;
}
