const slug = require("slug");
import { Types } from "mongoose";
import { Product } from "../../models/product.model";
import {
  IProduct,
  IProductCreateUpdate,
} from "../../types/admin/product.types";

/* count all */
const countAll = async (): Promise<number> => {
  return await Product.countDocuments();
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

/* find all reosurce by paginate */
const findAll = async ({
  page, 
  limit,
}: {
  page: number;
  limit: number;
}): Promise<IProduct[] | []> => {
  return await Product.find()
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
  findAll,
  countAll,
  searchByKey,
  findOneById,
  findOnebykey,
  createProduct,
  findByIdAndUpdate,
  findByIdAndDelete,
};
