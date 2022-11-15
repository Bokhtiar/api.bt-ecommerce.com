import { Schema, model } from "mongoose";
import { IAuth } from "../types/admin/auth.types";

/**Admin database field */
export const adminSchema: Schema = new Schema<IAuth>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**Database name */
export const Admin = model<IAuth>("Admin", adminSchema);
