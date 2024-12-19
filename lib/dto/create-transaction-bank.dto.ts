import { TypeRequest } from './request-type';

export class CreateTransactionBankDto {
    PartnerCode: string;
    ServiceCode: string;
    CommandCode: string;
    RequestContent: string;
}

export class TransactionRequest {
    Type: TypeRequest;
    BankName: string;
    RefCode: string;
    Amount: number;
    CallbackUrl: string;
}
