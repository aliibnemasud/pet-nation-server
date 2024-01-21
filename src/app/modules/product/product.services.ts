import { IProduct } from "./product.interface";
import { Product } from "./product.schema";

const createProductService= async (product: IProduct ): Promise<IProduct | null> => {
    const addedProduct = Product.create(product);    
    return addedProduct;
};

export const ProductServices = {
    createProductService
};