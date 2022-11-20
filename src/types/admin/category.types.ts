import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  banner_image: string;
} 

export interface ICategoryCreateOrUpdate {
  name: string;
  icon: string;
  banner_image: string;
} 
