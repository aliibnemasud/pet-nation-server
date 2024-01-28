import { Model, Schema } from "mongoose";

type IProduct = {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

export type IOrder = {
  products: IProduct[];
  totalAmount: string;
  transactionId: string;
}

export type IOrderFilter = { searchTerm: string };

export type IOrderModel = Model<IOrder>;