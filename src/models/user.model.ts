import { Schema, model } from "mongoose";
import { IUser } from '../types/user/user.types'

const userSchema: Schema = new Schema<IUser>(
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

export const User = model<IUser>("User", userSchema);
