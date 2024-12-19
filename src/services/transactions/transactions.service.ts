import { Transaction } from '@/entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: Model<Transaction>,
    ) {}

    async findByRefCode(refCode: string) {
        return await this.transactionModel.findOne({ refCode: refCode });
    }

    async create(dto: TransactionDto) {
        const transaction = new this.transactionModel(dto);
        return await this.transactionModel.create(transaction);
    }
}
