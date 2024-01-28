import { IProduct } from "../product/product.interface";
import { IOrder } from "./order.interface";
import { Order } from "./order.schema";

const createOrderService = async (order: IOrder ): Promise<IOrder | null> => {

    const addedOrder = Order.create(order);    
    return addedOrder;
};


export const OrderServices = {
    createOrderService
}