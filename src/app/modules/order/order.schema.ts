import mongoose, { Schema, model } from "mongoose";
import { IOrder, IOrderModel } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount:  {
    type: String,
    required: true
    },
  transactionId: {
    type: String,
    required: true
   },
  name: {
    type: String,
    required: true
   },
  phone: {
    type: String,
    required: true
   },
  email: {
    type: String,
    required: true
   },
  address: {
    type: String,
    required: true
   }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

export const Order = model<IOrder, IOrderModel>('Order', orderSchema);