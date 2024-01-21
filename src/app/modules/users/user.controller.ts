import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserServices } from './user.services';


const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const { customer, ...userData } = req.body;
    
   const createdUser = await UserServices.createCustomerService(
        customer,
        userData
    );
    res.send({
        success: true,
        message: 'Customer created successfully!',
        data: createdUser,
    });
});




export const usersController = {
    createCustomer,
};