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
  is_product: "regular" | "flash_sale";
  description?: string;
  quantity?: number;
  discount?: number;
}

export interface IProductCreateUpdate {
  category: Types.ObjectId;
  subCategory: Types.ObjectId
  name: string;
  sale_price: number;
  regular_price: number;
  image: string;
  is_product: "regular" | "flash_sale";
  description?: string;
  quantity?: number;
  discount?: number | null;
}
