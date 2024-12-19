import { TransactionV2 } from '@/entities/transaction.entity';

export class TransactionHistoryDto {
    responseCode: number;
    message: string;
    transction: TransactionV2;
}
