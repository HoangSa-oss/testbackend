import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { GetBankDto } from './dto/get-bank.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('banks')
    // @AutoGenerateSwagger(GetBankPaymentDto)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                partnerCode: { type: 'string', example: '' },
            },
        },
    })
    findAllBank(@Body() getBankDto: GetBankDto) {
        return this.paymentService.findAllBank(getBankDto);
    }

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return await this.paymentService.createTransaction(createPaymentDto);
    }
    @Get('transaction-history')
    @UseGuards(JwtAuthGuard)
    async transactionHistory(@Query() {page,limit}:{page:number,limit:number}){
        const allTransactionHistory = await this.paymentService.findAllTransactionHistory(page,limit)
        return allTransactionHistory
    }
    @Get(':refCode')
    async findTransaction(@Param('refCode') refCode: string) {
        return await this.paymentService.findTransactionHistory(refCode);
    }
}
