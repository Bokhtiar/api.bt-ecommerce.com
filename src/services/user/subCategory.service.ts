import { Types } from "mongoose";
import { Product } from "../../models/product.model";
import { IProduct } from "../../types/user/product.types";
import { SubCategory } from "../../models/subCategory.model";
import { ISubCategory } from "../../types/user/subCategory.types";

/* find all subcategory */
const findAll = async (): Promise<ISubCategory[] | []> => {
  return await SubCategory.find();
};

/* specific resource by find one */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ISubCategory | null> => {
  return await SubCategory.findById(_id);
};

/* subcategory has assign product */
const subCategoryHasAssignProduct = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct[] | []> => {
  return await Product.find({ subCategory: _id });
};

export const userSubCategoryService = {
  findAll,
  findOneById,
  subCategoryHasAssignProduct,
};
