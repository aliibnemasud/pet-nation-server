import { Model } from "mongoose";

export type IProduct = {  
    name: string;
    description: string;
    price: string;
    category: string;    
    productImage?: string;
};

export type IProductModel = Model<IProduct>;