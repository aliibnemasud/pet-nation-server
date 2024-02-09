import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderRequest = req.body;
   
   const createdUser = await OrderServices.createOrderService(orderRequest);
    res.send({
        success: true,
        message: 'Order created successfully!',
        data: createdUser,
    });
});

export const orderController = {
    createOrder
}