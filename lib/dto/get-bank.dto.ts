import { TypeRequest } from './request-type';

export class GetBankPaymentDto {
    partnerCode: string;
    serviceCode: string;
    commandCode: string;
    requestContent: string;
}

export class GetBankRequest {
    Type: TypeRequest;
}
