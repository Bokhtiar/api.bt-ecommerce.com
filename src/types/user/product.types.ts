import { Types } from "mongoose";

interface ICategory {
  _id: Types.ObjectId;
  name: string;
}

interface ISubCategory {
  _id: Types.ObjectId;
  name: string;
}

export interface IProduct {
  _id: Types.ObjectId;
  category: ICategory | Types.ObjectId;
  subCategory: ISubCategory | Types.ObjectId;
  name: string;
  slug: string;
  sale_price: number;
  regular_price: number;
  image: string;
  description?: string;
  quantity?: number;
  discount?: number;
}
