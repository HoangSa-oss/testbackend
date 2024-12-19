import { User } from '@/entities/user.entity';

export class CreateUserDeviceDto {
  deviceName: string;
  ip: string;
  user: User;
}
