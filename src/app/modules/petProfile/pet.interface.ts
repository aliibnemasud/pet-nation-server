import { Document } from "mongoose";

export type IPetDocument = Document & IPet;

export type IPet = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  postCode: string;
  phone: string;
  petName: string;
  petCategory: string;
  petBreed?: string;
  petGender: string;
  petBirthday: Date;
  petWeight: string;
}

export type IPetFilter = { searchTerm: string };




