import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  banner_image: string;
  created_by: Types.ObjectId;
}

export interface ICategoryCreateOrUpdate {
  name: string;
  slug: string;
  icon: string;
  banner_image: string;
  created_by: Types.ObjectId;
}
