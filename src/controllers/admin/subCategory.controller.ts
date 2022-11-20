import { Types } from "mongoose";
import { Response, Request, NextFunction } from "express";
import { adminCategoryService } from "../../services/admin/category.service";
import { adminSubCategoryService } from "../../services/admin/subCategory.service";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import {
  ISubCategory,
  ISubCategoryCreateUpdate,
} from "../../types/admin/subCategory.types";

/* find all resource by paginate */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];

    const totalItems = await adminSubCategoryService.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    /* Search from query */
    if (searchQuery) {
      results = await adminSubCategoryService.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await adminSubCategoryService.findAll({ page, limit });
    }

    res.status(200).json({
      status: true,
      data: results,
      paginate: paginate({ total_items: totalItems, page, limit }),
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/* store new resource */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, name, logo, banner_image } = req.body;

    /* check name exists  */
    const nameExists = await adminSubCategoryService.findOneByKey({ name });
    if (nameExists) {
      return res.status(409).json({
        status: false,
        message: "Name already exists",
      });
    }

    /* check available category */
    const availableCategory = await adminCategoryService.findOneById({
      _id: new Types.ObjectId(category),
    });
    if (!availableCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }

    const documents: ISubCategoryCreateUpdate = {
      category: new Types.ObjectId(category),
      name,
      logo,
      banner_image,
    };

    await adminSubCategoryService.subcategoryCreate({ documents: { ...documents } });

    res.status(201).json({
      status: true,
      message: "Sub category created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* spacific resource show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminSubCategoryService.findOneById({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* spacific reousrce update */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { category, name, logo, banner_image } = req.body;

    /* check unique name */
    const existWithName = await adminSubCategoryService.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json({
        status: false,
        message: "This name already exists.",
      });
    }

    /* check available category */
    const availableCategory = await adminCategoryService.findOneById({
      _id: new Types.ObjectId(category),
    });
    if (!availableCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found.",
      });
    }

    const document: ISubCategoryCreateUpdate = {
      category: new Types.ObjectId(category),
      name,
      logo,
      banner_image,
    };

    await adminSubCategoryService.findOneByIdAndUpdate({
      _id: new Types.ObjectId(id),
      documents: { ...document },
    });

    res.status(200).json({
      status: true,
      message: "Sub category updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific reource delete */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await adminSubCategoryService.findOneByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      message: "Sub category deleted."
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
