import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { createTransaction, getBanks } from '@/lib/payment.helper';
import { GetBankPaymentDto, GetBankRequest } from '@/lib/dto/get-bank.dto';
import { GetBankDto } from './dto/get-bank.dto';
import {
    CreateTransactionBankDto,
    TransactionRequest,
} from '@/lib/dto/create-transaction-bank.dto';
import mongoose from 'mongoose';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionDto } from 'src/services/transactions/dto/create-transaction.dto';
import { APIResponse, TransactionOrder } from '@/lib/dto/api-response';
import { TransactionHistoryDto } from './dto/transaction-history.dto';

// eslint-disable-next-line prefer-const
let partnerCache = {
    nc03: 'f85fec2974ac184b21ba419adf890c1a',
};
const PARTNER_CODE = 'nc03';
@Injectable()
export class PaymentService {
    constructor(
        private readonly transactionService: TransactionsService,
        private readonly transactionHistoryService: TransactionHistoriesService,
    ) {}

    private getPartnerKey(partnerCode: string) {
        const partnerKey = partnerCache[partnerCode];
        if (!partnerKey) {
            partnerCache[partnerCode] = 'f85fec2974ac184b21ba419adf890c1a';
        }
        return partnerKey;
    }

    async findAllBank(dto: GetBankDto) {
        const partnerCode = dto.partnerCode ?? PARTNER_CODE;
        const model = new GetBankPaymentDto();
        model.partnerCode = partnerCode;
        model.serviceCode = 'bankdirect';
        model.commandCode = 'getbanks';
        const requestType: GetBankRequest = {
            Type: 'banktranfer',
        };
        model.requestContent = JSON.stringify(requestType);
        return await getBanks(model, this.getPartnerKey(partnerCode));
    }

    async createTransaction(dto: CreatePaymentDto) {
        console.log(dto)
        const refCode = new mongoose.Types.ObjectId().toString();
        const amount = dto.amount;
        if (amount <= 0) {
            console.log('invalid amount');

            return null;
        }
        // await this.getAmmount(dto);
        const requestContent: TransactionRequest = {
            Type: dto.requestContent.type,
            BankName: dto.requestContent.bankName,
            RefCode: refCode,
            Amount: amount,
            CallbackUrl: process.env.TRANSACTION_CALLBACK_URL,
        };
        const partnerCode = dto.partnerCode ?? PARTNER_CODE;
        const model: CreateTransactionBankDto = {
            PartnerCode: partnerCode,
            ServiceCode: 'bankdirect',
            CommandCode: 'order',
            RequestContent: JSON.stringify(requestContent),
        };
        const transactionResponse: APIResponse = await createTransaction(
            model,
            this.getPartnerKey(partnerCode),
        );
        console.log("transactionResponse"+transactionResponse)
        let orderNo = '';
        if (transactionResponse.ResponseCode === 1) {
            const res: TransactionOrder = JSON.parse(
                transactionResponse.ResponseContent,
            );
            orderNo = res.OrderNo;
        }

        const transactiondto: TransactionDto = {
            transactionRequest: JSON.stringify(model),
            phoneNumber: dto.phoneNumber,
            refCode: refCode,
            amount: amount,
            email: dto.email,
            orderNo,
            userCustom: dto.userCustom,
            // [Kiet] update after has topup
            topup: null,
        };

        await this.transactionService.create(transactiondto);

        return transactionResponse;
    }

    async findTransactionHistory(refCode: string) {
        const transactionHistory =
            await this.transactionHistoryService.findTransactionHistoryByRefCode(
                refCode,
            );

        if (!transactionHistory) return null;

        const viewModel: TransactionHistoryDto = {
            _id: transactionHistory.id,
            responseCode: transactionHistory.responseCode,
        };

        return viewModel;
    }
    async findAllTransactionHistory(page:number,limit:number){
        const allTransactionHistory = await this.transactionHistoryService.findAllTransactionHistory(page,limit)
        return allTransactionHistory
    }
    private async getAmmount(
        createPaymentDto: CreatePaymentDto,
    ): Promise<number> {
        return 10000;
    }
}
