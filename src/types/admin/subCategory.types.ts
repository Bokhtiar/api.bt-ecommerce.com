import { Types } from "mongoose";

export interface ISubCategory {
  _id: Types.ObjectId;
  category: Types.ObjectId;
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
