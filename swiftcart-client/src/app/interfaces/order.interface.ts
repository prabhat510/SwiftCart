export interface IOrder {
    userId: string,
    totalAmount: number,
    items: Array<any>,
    shippingAddress: string,
    status: string
}