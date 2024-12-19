import { UserV2 } from '@/entities/user.entity';

export class CreateUserDeviceDto {
  deviceName: string;
  ip: string;
  user: UserV2;
}
