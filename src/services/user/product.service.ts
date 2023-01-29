import { Types } from "mongoose";
import { IProduct } from "src/types/user/product.types";
import { Product } from "../../models/product.model";

/* find all regular product */
const findAllRegularProduct = async (): Promise<IProduct[] | []> => {
  return await Product.find({ is_product: "regular" });
};

/* find all flash sale product */
const findAllFlashSaleProduct = async (): Promise<IProduct[] | []> => {
  return await Product.find({ is_product: "flash_sale" });
};

/* find one by specific resource */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Product.findById(_id).populate("category", "name");
};
 
/* find all product */
const findAllReleted = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct[] | []> => {
   console.log("ids",_id);
  const product = await Product.findOne(_id)
  return await Product.find({category: product?.category});
};

export const userProductService = {
  findAllRegularProduct,
  findAllFlashSaleProduct,
  findAllReleted,
  findOneById,
};
