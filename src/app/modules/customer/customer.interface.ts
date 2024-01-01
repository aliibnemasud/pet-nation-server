import { Model } from "mongoose";

export type ICustomer = {
    id: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    dateOfBirth: string;
    email: string;
    contactNo: string;
    gender: 'male' | 'female';
    permanentAddress: string;
    presentAddress: string;
    profileImage?: string;
};

export type ICustomerModel = Model<ICustomer>;