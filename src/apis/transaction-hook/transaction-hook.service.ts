import { Injectable } from '@nestjs/common';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { TransactionHistoriesService } from 'src/services/transaction-histories/transaction-histories.service';
import { CallBackData } from '@/lib/dto/callback-data';
import { Model } from 'mongoose';
import { TransactionHistoryV2 } from '@/entities/transaction-history.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionHookService {
    constructor(
       
        private transactionService: TransactionsService,
        private transactionHistoriesService: TransactionHistoriesService,
    ) {}
    async create(apiResponse: CallBackData) {
        
        const responseContent = JSON.parse(apiResponse.ResponseContent)
        const transactionHistory =
            await this.transactionHistoriesService.findTransactionHistoryByRefCode(
                responseContent.RefCode,
            );
        if (transactionHistory) {
            return transactionHistory;
        }
        const transaction = await this.getTransaction(
            responseContent.RefCode,
            responseContent.OrderNo,
        );
       
        await this.transactionHistoriesService.createTransctionHistory(
            apiResponse.ResponseCode,
            responseContent.RefCode,
            responseContent.OrderNo,
            apiResponse.Description,
            transaction,     
        );
    }

    private async getTransaction(refCode: string, orderNo: string) {
        const transaction = await this.transactionService.findByRefCode(
            refCode,
        );
        if (transaction?.orderNo !== orderNo) {
            console.log('Order No not match');

            return null;
        }
        return transaction;
    }
}
