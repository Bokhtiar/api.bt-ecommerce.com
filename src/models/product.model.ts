import { Schema, model } from "mongoose";
import { IProduct } from "../types/admin/product.types";

const productSchema: Schema = new Schema<IProduct>(
  {
    category: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "Category", 
      required: true,
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "SubCategory",
      required: true,
    },

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

    sale_price: {
      type: Number,
      trim: true,
      required: true,
    },

    regular_price: {
      type: Number,
      trim: true,
      required: true,
    },

    image: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: false,
    },
    quantity: {
      type: Number,
      trim: true,
      default: false,
    },
    discount: {
      type: Number,
      trim: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>("Product", productSchema);
