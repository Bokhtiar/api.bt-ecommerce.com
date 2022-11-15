import { Types } from "mongoose";

export interface IAuth {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface IAuthCreateOrUpdate {
  name: string;
  email: string;
  phone: number;
  password: string;
}
