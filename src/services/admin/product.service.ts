const slug = require("slug");
import { Types } from "mongoose";
import { Product } from "../../models/product.model";
import {
  IProduct,
  IProductCreateUpdate,
} from "../../types/admin/product.types";

/* count all regular product */
const countAllRegular = async (): Promise<number> => {
  return await Product.countDocuments({is_product: "regular"});
};

/* count all flash sale product */
const countAllFlasSale = async (): Promise<number> => {
  return await Product.countDocuments({is_product: "flash_sale"});
};

/* specific reosurce  find one by key */
const findOnebykey = async (params: any): Promise<IProduct | null> => {
  return await Product.findOne({ ...params }).populate("category", "name").populate("subCategory", "name");;
};

/* find One specific resource */
const findOneById = async ({
  _id,
}: { 
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Product.findById(_id).populate("category", "name").populate("subCategory", "name");
};

/* find all regular product reosurce by paginate */
const findAllRegularProduct = async ({
  page,
  limit,
}: { 
  page: number;
  limit: number;
}): Promise<IProduct[] | []> => {
  return await Product.find({is_product: 'regular'})
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/* find all flash sale reosurce by paginate */
const findAllFlashSaleProduct = async ({
  page,
  limit,
}: { 
  page: number;
  limit: number;
}): Promise<IProduct[] | []> => {
  return await Product.find({is_product: 'flash_sale'})
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/* create new resrouce */
const createProduct = async ({
  documents,
}: {
  documents: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  const newResource = new Product({
    category: documents.category,
    subCategory: documents.subCategory,
    name: documents.name,
    slug: slug(documents.name),
    sale_price: documents.sale_price,
    regular_price: documents.regular_price,
    image: documents.image,
    description: documents.description,
    quantity: documents.quantity,
    discount: documents.discount,
    is_product: documents.is_product,
  });

  return await newResource.save();
};

/* find specific resource by id and updated keys */
const findByIdAndUpdate = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(_id, { $set: { ...documents } });
};

/* find sepecific reosurce by id and delete */
const findByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(_id);
};

/* Search by key */
export const searchByKey = async ({
  query,
}: {
  query: string;
}): Promise<IProduct[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Product.find(
    {
      $or: [{ name: queryRegExp }, { slug: queryRegExp }],
    },
    {
      created_by: 0,
    }
  );
};

export const adminProductService = {
  findAllRegularProduct,
  findAllFlashSaleProduct,
  countAllFlasSale,
  countAllRegular,
  searchByKey,
  findOneById,
  findOnebykey,
  createProduct,
  findByIdAndUpdate,
  findByIdAndDelete,
};
