import { TypeRequest } from '@/lib/dto/request-type';

export class CreatePaymentDto {
    phoneNumber: string;
    email: string;
    partnerCode: string;
    userCustom: string;
    merchantId: string;
    topupId: string;
    amount: number;
    requestContent: TransactionRequestDto;
}

export class TransactionRequestDto {
    type: TypeRequest;
    bankName: string;
}
