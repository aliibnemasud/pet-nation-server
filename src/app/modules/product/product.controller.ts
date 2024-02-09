import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProductServices } from './product.services';
import pick from '../../../shared/pick';
import { searchableFields } from './product.constant';
import { paginationFields } from '../../constants/pagination';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const product = JSON.parse(data.product);    
    if(req.file){
       product.productImage = `http://localhost:5000/${req.file.path}`;
    }
   const createdUser = await ProductServices.createProductService(product);
    res.send({
        success: true,
        message: 'Product created successfully!',
        data: createdUser,
    });
});


const getAllProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters: any = pick(req.query, searchableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ProductServices.getProducts(
      filters,
      paginationOptions
    );

    sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters data retrieved!',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductServices.getSingleProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester data retrieved!',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await ProductServices.updateProductById(id, payload);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product data retrieved!',
    data: result,
  });
});


const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductServices.deleteProductById(id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully!',
    data: result,
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
    uploadImages,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
};