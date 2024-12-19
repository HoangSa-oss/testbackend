import { Topup } from '@/entities/topup.entity';

export class TransactionDto {
    transactionRequest: string;
    phoneNumber: string;
    userCustom: string;
    refCode: string;
    orderNo: string;
    amount: number;
    email: string;
    topup: Topup;
}
