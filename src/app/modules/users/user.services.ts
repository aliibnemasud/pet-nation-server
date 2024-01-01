import mongoose from "mongoose";
import httpStatus from 'http-status';
import config from "../../../config";
import { IUser } from "./user.interface";
import { generateUserId } from "./user.utils";
import { User } from "./user.schema";
import { Customer } from "../customer/customer.schema";
import { ICustomer } from "../customer/customer.interface";
import ApiError from "../../../Errors/ApiError";

const createCustomerService = async (
    customer: ICustomer,
    user: IUser
): Promise<IUser | null> => {
    user.role = 'customer';
    // Default password
    if (!user.password) {
        user.password = config.default_customer_pass as string;
    }
    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const id = await generateUserId();
        user.id = id;
        customer.id = id;
        const newCustomer = await Customer.create([customer], { session });

        if (!newCustomer.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Customer!');
        }

        //  set student id
        user.customer = newCustomer[0]._id;
        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User!');
        }

        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ id: newUserAllData.id })/* .populate({
            path: 'customer',
        }); */
    }
    return newUserAllData;
};

/* const createUser = async (
    payload: IUser
): Promise<IUser> => {
    console.log(payload)
    const result = await User.create(payload);
    return result;
}; */



export const UserServices = {
    createCustomerService,
    // createUser
};