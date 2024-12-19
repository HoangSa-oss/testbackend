export class APIResponse {
    ResponseCode: number;
    Description: string;
    ResponseContent: string;
    Signature: string;
}

export class TransactionOrder {
    Status: string;
    BankName: string;
    BankAccountNumber: string;
    BankAccountName: string;
    Amount: number;
    RefCode: string;
    OrderNo: string;
    Timeout: number;
    Url: string;
    QRCode: string;
}
