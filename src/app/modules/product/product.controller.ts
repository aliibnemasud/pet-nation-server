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


const uploadImages = catchAsync(async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.file);
    } catch (error) {
      console.log(error);
    }
  })


export const productController = {
    createProduct,
    uploadImages
};