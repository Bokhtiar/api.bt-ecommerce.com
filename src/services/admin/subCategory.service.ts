import { SubCategory } from "../../models/subCategory.model";
import { Types } from "mongoose";
import {
  ISubCategory,
  ISubCategoryCreateUpdate,
} from "../../types/admin/subCategory.types";

/* count all */
const countAll = async (): Promise<number> => {
  return await SubCategory.countDocuments();
};

/* find all reosurce by paginate */
const findAll = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ISubCategory[] | []> => {
  return await SubCategory.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/* specific resource find one by key */
const findOneByKey = async (data: any): Promise<ISubCategory | null> => {
  return await SubCategory.findOne({ ...data });
};

/* create new resource */
const subcategoryCreate = async ({
  documents,
}: {
  documents: ISubCategoryCreateUpdate;
}): Promise<ISubCategory | null> => {
  const newSubCategory = new SubCategory({
    category: documents.category,
    name: documents.name,
    logo: documents.logo,
    banner_image: documents.logo,
  });
  return await newSubCategory.save();
};

/* find one specific resource */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ISubCategory | null> => {
  return await SubCategory.findById(_id).populate("category", "name");
};

/* find specific resource by update */
const findOneByIdAndUpdate = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: ISubCategoryCreateUpdate;
}): Promise<ISubCategory | null> => {
  return await SubCategory.findByIdAndUpdate(_id, { $set: { ...documents } });
};

/* find specific resource by delete */
const findOneByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ISubCategory | null> => {
  return await SubCategory.findByIdAndDelete(_id);
};

/* Search by key */
const searchByKey = async ({
  query,
}: {
  query: string;
}): Promise<ISubCategory[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await SubCategory.find(
    {
      $or: [{ name: queryRegExp }],
    },
    {
      created_by: 0,
    }
  );
};

export const adminSubCategoryService = {
  findAll,
  countAll,
  findOneById,
  searchByKey,
  findOneByKey,
  subcategoryCreate,
  findOneByIdAndUpdate,
  findOneByIdAndDelete,
};
