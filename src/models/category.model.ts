import { Schema, model } from "mongoose";
import { ICategory } from "../types/admin/category.types";

/**Category table filed */
const categorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    banner_image: {
      type: String,
      default: null,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**Database table name deaclear */
export const Category = model<ICategory>("Category", categorySchema);