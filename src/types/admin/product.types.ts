import { Types } from "mongoose";

interface ICategory {
  _id: Types.ObjectId;
  name: string;
}

export interface IProduct {
  _id: Types.ObjectId;
  category: ICategory | Types.ObjectId;
  name: string;
  slug: string;
  sale_price: number;
  regular_price: number;
  image: string;
  description?: string;
  quantity?: number;
  discount?: number;
}

export interface IProductCreateUpdate {
  category: Types.ObjectId;
  name: string;
  sale_price: number;
  regular_price: number;
  image: string;
  description?: string;
  quantity?: number;
  discount?: number | null;
}
