import { CartItem } from "./cartItem";
import { VoucherModel } from "./voucher";

export interface GetOrder{
    id: number,
    address: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    date: string,
    totalPrice: number,
    status: string,
    orderItems:[CartItem]
    coupon: VoucherModel
}