export class CreateTopupDto {
    name: string;
    amount: number;
    promotion: number;
    taxRate: number;
    taxAmount: number;
    amountAfterDiscount: number;
    discountPercent: number;
    bestDeal: boolean;
    discountTime: Date;
    sortOrder: number;
    merchantId: string;
}
