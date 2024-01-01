import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserServices } from './user.services';


const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const { customer, ...userData } = req.body;

    /* const createdUser = await UserServices.createCustomerService(
        customer,
        userData
    ); */    

    res.send({
        success: true,
        message: 'Customer created successfully!',
        data: customer,
    });
});

const createUser = async (req: Request, res: Response) => {
      const { ...userData } = req.body;    
  
      /* const createdUser = await UserServices.createUser(
        academicFacultyData
      ); */
  
      /* sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty Created',
        data: createdFaculty,
      }); */
      res.send({
        success: true,
        message: 'Customer created successfully!',
        data: userData,
    });

    }



export const usersController = {
    createCustomer,
    createUser
};