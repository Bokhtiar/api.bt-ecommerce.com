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

    await adminSubCategoryService.createResource({ data: { ...documents } });

    res.status(201).json({
      status: true,
      message: "Sub category created."
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
