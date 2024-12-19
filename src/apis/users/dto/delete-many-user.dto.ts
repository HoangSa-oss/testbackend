import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteManyUserDto {
    @ApiProperty({ default: [], type: Array, required: true })
    @IsArray()
    userIds: string[];
}
