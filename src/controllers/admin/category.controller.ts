import { adminCategoryService } from "../../services/admin/category.service";
import { Request, Response, NextFunction } from "express";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { Types } from "mongoose";
import { ICategoryCreateOrUpdate } from "src/types/admin/category.types";

/* List of resources */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];

    const totalItems = await adminCategoryService.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    /* Search from query */
    if (searchQuery) {
      results = await adminCategoryService.searchByKey(searchQuery.toString());
    } else {
      results = await adminCategoryService.findAll({ page, limit });
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

/* store resource  */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, banner_image } = req.body;

    /* check already exist name */
    const isExistName = await adminCategoryService.findOneByKey({ name: name });
    if (isExistName) {
      return res.status(409).json({
        status: false,
        message: "Category already created.",
      });
    }

    const documents: ICategoryCreateOrUpdate = {
      name,
      icon,
      banner_image,
    };

    await adminCategoryService.resourceCreate({
      data: { ...documents },
    });
    res.status(201).json({
      status: true,
      message: "Category Created.",
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/* show specific resource */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminCategoryService.findOneById({
      _id: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/* update specific resource */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, icon, banner_image } = req.body;

    /* check unique name */
    const existWithName = await adminCategoryService.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json({
        status: false,
        message: "This name already exists.",
      });
    }

    const documents: ICategoryCreateOrUpdate = {
      name,
      icon,
      banner_image,
    };

    await adminCategoryService.findByIdAndUpdate({
      _id: new Types.ObjectId(id),
      data: { ...documents },
    });
    res.status(200).json({
      status: true,
      message: "Category updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* destroy category */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    /* check avaialbe category */
    const availableCategory = await adminCategoryService.findOneById({
      _id: new Types.ObjectId(id),
    });
    if (!availableCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }

    await adminCategoryService.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: true,
      message: "Category deleted.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
