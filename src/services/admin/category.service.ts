const slug = require('slug')
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

/**specific reosouce findById */
export const findById = async (id: string): Promise<ICategory | null> => {
  return await Models.Category.findById(id);
};

/**create resource */
export const resourceCreate = async (
  data: ICategoryCreateOrUpdate
): Promise<ICategory | null> => {
  const newCategory = new Models.Category({
    name: data.name,
    slug: slug(data.name),
    icon: data.icon,
    banner_image: data.banner_image,
  });
  return await newCategory.save();
};

/**findByIdAndUpdate resource  */
export const findByIdAndUpdate = async (
  id: string,
  data: ICategoryCreateOrUpdate
): Promise<ICategory | null> => {
  return await Models.Category.findByIdAndUpdate(id, { $set: { ...data } });
};

/**specific resource findByIdAndDelete  */
export const findByIdAndDelete = async (
  id: string
): Promise<ICategory | null> => {
  return await Models.Category.findByIdAndDelete(id);
};

/* Search by key */
export const searchByKey = async (query: string): Promise<ICategory[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Models.Category.find(
    {
      $and: [{}, { $or: [{ name: queryRegExp }, { slug: queryRegExp }] }],
    },
    {
      created_by: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );
};
