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

/**specific resource findOneByKey */
const findOneByKey = async (params: any): Promise<ICategory | null> => {
  return await Category.findOne({ ...params });
};

/**specific reosouce findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findById(_id);
};

/**create resource */
const resourceCreate = async ({
  data,
}: {
  data: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  const newCategory = new Category({
    name: data.name,
    slug: slug(data.name),
    icon: data.icon,
    banner_image: data.banner_image,
  });
  return await newCategory.save();
};

/**findByIdAndUpdate resource  */
const findByIdAndUpdate = async ({
  _id,
  data,
}: {
  _id: Types.ObjectId;
  data: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(_id, {
    $set: {
      name: data.name,
      slug: slug(data.name),
      icon: data.icon,
      banner_image: data.banner_image,
    },
  });
};

/**specific resource findByIdAndDelete  */
const findByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(_id);
};

/* Search by key */
const searchByKey = async (query: string): Promise<ICategory[] | []> => {
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
  resourceCreate,
  findByIdAndUpdate,
  findByIdAndDelete,
};
