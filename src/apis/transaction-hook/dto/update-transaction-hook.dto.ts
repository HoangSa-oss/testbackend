import { PartialType } from '@nestjs/swagger';
import { CreateTransactionHookDto } from './create-transaction-hook.dto';

export class UpdateTransactionHookDto extends PartialType(CreateTransactionHookDto) {}
