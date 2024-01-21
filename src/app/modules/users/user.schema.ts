import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser, Record<string, never>>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    }, 
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);


/*      
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    }, */