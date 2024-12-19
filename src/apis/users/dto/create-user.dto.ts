import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserType } from 'src/constants/enums';
import { ROLES } from 'src/constants/string-constants';

export class CreateUserDto {
    @ApiProperty({ default: 'user_name', type: String })
    user_name: string;

    @ApiProperty({ default: '*****', type: String })
    password: string;

    @ApiProperty({ default: 'your name', type: String })
    full_name: string;

    @ApiProperty({ default: '0919111222', type: String, maximum: 12 })
    phone: string;

    company: string;

    @ApiProperty({
        default:
            'https://as2.ftcdn.net/v2/jpg/02/08/98/05/1000_F_208980504_njS12KTuZLQ3wQZaHLbKpSLFNu9rF6Hs.jpg',
        type: String,
    })
    avatar: string;

    @ApiProperty({ default: 'street', type: String })
    street: string;

    @ApiProperty({ default: 'city', type: String })
    city: string;

    @ApiProperty({ default: 'state', type: String })
    state: string;

    @ApiProperty({ default: 'zipCode', type: String })
    zip_code: string;

    @ApiProperty({ enum: UserType, default: UserType.User })
    @IsEnum(UserType, {
        message: `User type must be a valid enum ${UserType.User} | ${UserType.SystemAdmin} | ${UserType.Operator}`,
    })
    user_type: string;

    @ApiProperty({ default: 'email', type: String })
    email: string;
}
