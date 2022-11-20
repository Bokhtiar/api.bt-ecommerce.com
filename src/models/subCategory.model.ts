import { Schema, model } from "mongoose";
import { ISubCategory } from "../types/admin/subCategory.types";

const subCategorySchema: Schema = new Schema<ISubCategory>(
  {
    category: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "Category"
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      trim: true,
      default: null,
    },
    banner_image: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const SubCategory = model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
