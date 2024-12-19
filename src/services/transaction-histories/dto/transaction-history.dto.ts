import { Transaction } from '@/entities/transaction.entity';

export class TransactionHistoryDto {
    responseCode: number;
    message: string;
    transction: Transaction;
}
