import { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  category: Types.ObjectId;
  name: string;
  slug: string;
  sale_price: number;
  regular_price: number;
  image: string;
  description?: string;
  quantity?: number;
  discrount?: number;
}

export interface IProductCreateOrUpdate {
  category: Types.ObjectId;
  name: string;
  sale_price: number;
  regular_price: number;
  image: string;
  description?: string;
  quantity?: number;
  discrount?: number;
}
