const slug = require("slug");
import { Types } from "mongoose";
import { Category } from "../../models/category.model";
import {
  ICategory,
  ICategoryCreateOrUpdate,
} from "../../types/admin/category.types";

/* count all */
const countAll = async (): Promise<number> => {
  return Category.countDocuments();
};

/* find resources by paginate */
const findAll = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ICategory[] | []> => {
  return await Category.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/* specific resource findOneByKey */
const findOneByKey = async (params: any): Promise<ICategory | null> => {
  return await Category.findOne({ ...params });
};

/* specific reosouce findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findById(_id);
};

/* create new resource */
const categoryCreate = async ({
  documents,
}: {
  documents: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  const newCategory = new Category({
    name: documents.name,
    slug: slug(documents.name),
    icon: documents.icon,
    banner_image: documents.banner_image,
  });
  return await newCategory.save();
};

/* specific one resource findByIdAndUpdate */
const findOneByIdAndUpdate = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(_id, {
    $set: {
      name: documents.name,
      slug: slug(documents.name),
      icon: documents.icon,
      banner_image: documents.banner_image,
    },
  });
};

/* specific resource findByIdAndDelete  */
const findOneByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(_id);
};

/* Search by key */
const searchByKey = async ({query}:{query:string}): Promise<ICategory[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Category.find(
    {
      $or: [{ name: queryRegExp }, { slug: queryRegExp }],
    },
    {
      created_by: 0,
    }
  );
};

export const adminCategoryService = {
  findAll,
  countAll,
  searchByKey,
  findOneById,
  findOneByKey,
  categoryCreate,
  findOneByIdAndUpdate,
  findOneByIdAndDelete,
};
