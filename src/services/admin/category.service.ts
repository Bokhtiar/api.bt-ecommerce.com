const slug = require("slug");
import { Types } from "mongoose";
import { Models } from "../../models";
import {
  ICategory,
  ICategoryCreateOrUpdate,
} from "../../types/admin/category.types";

/**Category count */
export const countAll = async (): Promise<number> => {
  return Models.Category.countDocuments();
};

/* find resources by paginate */
export const findAll = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ICategory[] | []> => {
  return await Models.Category.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/**specific resource findOneByKey */
export const findOneByKey = async (params: any): Promise<ICategory | null> => {
  return await Models.Category.findOne({ ...params });
};

/**specific reosouce findOneById */
export const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Models.Category.findById(_id);
};

/**create resource */
export const resourceCreate = async ({
  data,
}: {
  data: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  const newCategory = new Models.Category({
    name: data.name,
    slug: slug(data.name),
    icon: data.icon,
    banner_image: data.banner_image,
  });
  return await newCategory.save();
};

/**findByIdAndUpdate resource  */
export const findByIdAndUpdate = async ({
  _id,
  data,
}: {
  _id: Types.ObjectId;
  data: ICategoryCreateOrUpdate;
}): Promise<ICategory | null> => {
  return await Models.Category.findByIdAndUpdate(_id, {
    $set: {
      name: data.name,
      slug: slug(data.name),
      icon: data.icon,
      banner_image: data.banner_image,
    },
  });
};

/**specific resource findByIdAndDelete  */
export const findByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Models.Category.findByIdAndDelete(_id);
};

/* Search by key */
export const searchByKey = async (query: string): Promise<ICategory[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Models.Category.find(
    {
      $or: [{ name: queryRegExp }, { slug: queryRegExp }],
    },
    {
      created_by: 0,
    }
  );
};
