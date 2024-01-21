import { Schema, model } from 'mongoose';
import { IProduct, IProductModel } from './product.interface';


const productSchema = new Schema<IProduct>(
  {    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct, IProductModel>('Product', productSchema);
