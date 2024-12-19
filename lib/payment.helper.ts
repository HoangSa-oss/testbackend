import { MD5 } from 'crypto-js';
import { GetBankPaymentDto } from './dto/get-bank.dto';
import { CreateTransactionBankDto } from './dto/create-transaction-bank.dto';
import fetch from 'node-fetch'
function hashMD5(agrs: string[]): string {
    return MD5(agrs.join('')).toString();
}

const BANK_GATE = 'https://bankgate.coroach.xyz/VPGJsonService.ashx';

export async function getBanks(dto: GetBankPaymentDto, partnerKey: string) {
    try {
        const agrs: Array<string> = Object.keys(dto).map((key) => dto[key]);
        agrs.push(partnerKey);
        const signature = hashMD5(agrs);
        const body = {
            ...dto,
            signature,
        };
        const response = await fetch(BANK_GATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        console.log({ error });

        return [];
    }
}

export async function createTransaction(
    dto: CreateTransactionBankDto,
    partnerKey: string,
) {
    try {
        console.log({ dto });

        const agrs: Array<string> = Object.keys(dto).map((key) => dto[key]);
        agrs.push(partnerKey);
        const signature = hashMD5(agrs);
        const body = {
            ...dto,
            signature,
        };
        const response = await fetch(BANK_GATE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        return [];
    }
}
