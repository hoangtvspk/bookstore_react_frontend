export interface VoucherModel {
    couponCode: string;
    minimumOrderValue: number;
    discountValue: number;
    discountPercentValue: number;
    dayStart: string;
    dayEnd: string;
    detail: string;
}