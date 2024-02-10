import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../shared/interfaces/common";
import { IPaginationOption } from "../../../shared/interfaces/pagination";
import { orderSearchableFields } from "./order.constant";
import { IOrder, IOrderDocument, IOrderFilter } from "./order.interface";
import { Order } from "./order.schema";

const createOrderService = async (order: IOrder): Promise<IOrder | null> => {
    const addedOrder = Order.create(order);
    return addedOrder;
};

const getAllOrders = async (
    filters: IOrderFilter,
    paginationOption: IPaginationOption
): Promise<IGenericResponse<IOrder[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    // this function working like the above structure for `SearchTerm`
    if (searchTerm) {
        andConditions.push({
            $or: orderSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // This function is working for exact match.
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // if search with everything or an empty object
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};
    const { limit, page, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(paginationOption);
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = await Order.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await Order.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleOrder = async (
    id: string
): Promise<IOrder | null> => {
    const result = Order.findById(id);
    return result;
};

const updateOrderById = async (
    id: string,
    payload: Partial<IOrder>
): Promise<IOrder | null> => {

    const result = await Order.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};

const deleteOrderById = async (
    id: string
): Promise<IOrderDocument | null> => {
    const result = await Order.findByIdAndDelete(id).lean().exec() as IOrderDocument;
    return result;
};


export const OrderServices = {
    createOrderService,
    getAllOrders,
    getSingleOrder,
    updateOrderById,
    deleteOrderById
}