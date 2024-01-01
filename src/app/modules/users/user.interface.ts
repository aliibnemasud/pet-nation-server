import { Types } from "mongoose";
import { ICustomer } from "../customer/customer.interface";

export type IUser = {
    id: string;
    role: string;
    userName: string;
    email: string;
    password?: string;
    needsPasswordChange: true | false;
    customer?: Types.ObjectId | ICustomer;    
    // admin?: Types.ObjectId | IAdmin;
  };