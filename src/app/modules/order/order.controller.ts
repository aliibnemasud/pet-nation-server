import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./order.services";
import sendResponse from "../../../shared/sendResponse";
import { IOrder } from "./order.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../constants/pagination";
import httpStatus from "http-status";
import { orderSearchableFieldsDirect } from "./order.constant";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderRequest = req.body;
    const createdUser = await OrderServices.createOrderService(orderRequest);
    res.send({
        success: true,
        message: 'Order created successfully!',
        data: createdUser,
    });
});

const getAllOrders: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const filters: any = pick(req.query, orderSearchableFieldsDirect);
        const paginationOptions = pick(req.query, paginationFields);
        const result = await OrderServices.getAllOrders(
            filters,
            paginationOptions
        );
        sendResponse<IOrder[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All Orders data retrieved!',
            data: result.data,
            meta: result.meta,
        });
    }
);

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OrderServices.getSingleOrder(id);
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order data retrieved!',
      data: result,
    });
  });
  
  const updateOrder = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await OrderServices.updateOrderById(id, payload);
  
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order data Updated!',
      data: result,
    });
  });
  
  
  const deleteOrder = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OrderServices.deleteOrderById(id);
  
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order deleted successfully!',
      data: result,
    });
  });

export const orderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder
}