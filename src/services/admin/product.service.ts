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
  return await Product.findOne({ ...params });
};

/* find One specific resource */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Product.findById(_id).populate("category", "name");
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
const createResource = async ({
  data,
}: {
  data: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  const newResource = new Product({
    category: data.category,
    name: data.name,
    slug: slug(data.name),
    sale_price: data.sale_price,
    regular_price: data.regular_price,
    image: data.image,
    description: data.description,
    quantity: data.quantity,
    discount: data.discount,
  });

  return await newResource.save();
};

/* find specific resource by id and updated keys */
const findByIdAndUpdate = async ({
  _id,
  data,
}: {
  _id: Types.ObjectId;
  data: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(_id, { $set: { ...data } });
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
  createResource,
  findByIdAndUpdate,
  findByIdAndDelete,
};
