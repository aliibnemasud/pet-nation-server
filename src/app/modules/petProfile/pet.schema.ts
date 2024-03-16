import mongoose, { Schema, model } from "mongoose";
import IPetProfile from "./pet.interface";

// Define interface for the PetProfile model
interface IPetModel extends mongoose.Model<IPetProfile> {}

// Define the pet profile schema
const petSchema = new Schema<IPetProfile>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  petName: {
    type: String,
    required: true
  },
  petCategory: {
    type: String,
    required: true
  },
  petBreed: String,
  petGender: {
    type: String,
    required: true
  },
  petBirthday: {
    type: Date,
    required: true
  },
  petWeight: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

// Create the Pet model
export const Pet = model<IPetProfile, IPetModel>('Pet', petSchema);
