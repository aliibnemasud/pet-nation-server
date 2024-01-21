import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import { ProductServices } from './product.services';


const createProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...product } = req.body;
   const createdUser = await ProductServices.createProductService(product);
    res.send({
        success: true,
        message: 'Product created successfully!',
        data: createdUser,
    });
});




export const productController = {
    createProduct,
};