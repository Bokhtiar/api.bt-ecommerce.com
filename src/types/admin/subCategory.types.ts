import { Types } from "mongoose";

interface ICategory {
  _id: Types.ObjectId;
  name: string;
}

export interface ISubCategory {
  _id: Types.ObjectId;
  category: Types.ObjectId | ICategory;
  name: string;
  logo: string;
  banner_image: string;
}

export interface ISubCategoryCreateUpdate {
  category: Types.ObjectId;
  name: string;
  logo?: string;
  banner_image?: string;
}
