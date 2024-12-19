import { TransactionHistoryV2 } from '@/entities/transaction-history.entity';
import { TransactionV2 } from '@/entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionHistoriesService {
    constructor(
        // @Inject(CACHE_MANAGER) private cacheManager: KeyvAdapter,
        @InjectModel(TransactionHistoryV2.name)
        private transactionHistoryModel: Model<TransactionHistoryV2>
    ) {}

    async createTransctionHistory(
        responseCode: number,
        refCode: string,
        orderNo: string,
        message: string,
        transaction?: TransactionV2,
    ) {
        const transactionHistory = new this.transactionHistoryModel({
            responseCode: responseCode,
            message,
            refCode,
            orderNo,
            transaction
        })
        if (transaction?.refCode) {
            // await this.cacheManager.delete(transaction.refCode);
        }
        await this.transactionHistoryModel.updateOne(
            { _id: transactionHistory._id },
            transactionHistory,
            {
                upsert: true,
                new: true,
            },
        );
        return transactionHistory;
    }

    async findTransactionHistoryByRefCode(refCode: string) {
        // if (await this.cacheManager.has(refCode)) {
        //     console.log('findTransactionHistory cache');
        //     return await this.cacheManager.get(refCode);
        // }
        const transactionHistory = await this.transactionHistoryModel.findOne({
            refCode,
        });
        // await this.cacheManager.set(
        //     refCode,
        //     transactionHistory?.responseCode ?? null,
        // );
        return transactionHistory;
    }
    async findAllTransactionHistory(page:number,limit:number) {
        // if (await this.cacheManager.has(refCode)) {
        //     console.log('findTransactionHistory cache');
        //     return await this.cacheManager.get(refCode);
        // }
        const allTransactionHistory = await this.transactionHistoryModel.find({}).skip(page*limit).limit(limit).populate('transaction',"-transactionRequest");
        const allTransactionHistoryCount = await this.transactionHistoryModel.find({}).count()
        // await this.cacheManager.set(
        //     refCode,
        //     transactionHistory?.responseCode ?? null,
        // );
        return {transactionHistory:allTransactionHistory,countAll:allTransactionHistoryCount};
    }
}
