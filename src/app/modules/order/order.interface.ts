import { Model, Schema, Document } from "mongoose";

type IProduct = {
  productId: Schema.Types.ObjectId;
  quantity: number;
}
export type IOrderDocument = Document & IOrder;
export type IOrder = {
  products: IProduct[];
  totalAmount: string;
  transactionId: string;
  name: string,
  email: string,
  phone: string,
  address: string,
  streetAddress: string,
  town: string,
  zipCode: string
}

export type IOrderFilter = { searchTerm: string };

export type IOrderModel = Model<IOrder>;