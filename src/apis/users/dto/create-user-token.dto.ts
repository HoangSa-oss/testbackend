import { User, UserDocument } from '@/entities/user.entity';

export class CreateUserTokenDto {
    refreshToken: string;
    deviceId: string;
    user: UserDocument;
}
