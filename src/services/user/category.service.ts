import { Types } from "mongoose";
import { Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { IProduct } from "../../types/user/product.types";
import { ICategory } from "../../types/user/category.types";
import { SubCategory } from "../../models/subCategory.model";

/* find all category */
const findAll = async (): Promise<ICategory[] | []> => {
  return await Category.find(
    {},
    { createdAt: 0, updatedAt: 0, banner_image: 0 }
  );
};

/* find specific category */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findById(_id);
};

/* find category has assing product */
const categoryHasAssingProduct = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct[] | []> => {
  return await Product.find({ category: _id });
};

/* find category has assign sub-category */
const categoryHasAssignSubCategory = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory[] | []> => {
  return await SubCategory.find({ category: _id });
};

export const userCategoryService = {
  findAll,
  findOneById,
  categoryHasAssingProduct,
  categoryHasAssignSubCategory
};
