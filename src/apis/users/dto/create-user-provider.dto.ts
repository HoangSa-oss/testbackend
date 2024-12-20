import { UserV2 } from '@/entities/user.entity';

export class CreateUserProviderDto {
  providerId: string;
  providerName: 'google' | 'facebook' | 'twitter' | 'apple' | undefined;
  user: UserV2;
}
