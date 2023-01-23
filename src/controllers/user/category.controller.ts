import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { userCategoryService } from "../../services/user/category.service";

/* find all resource */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resutls = await userCategoryService.findAll();
    res.status(200).json({
      status: true,
      message: "category list",
      data: resutls,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* find specific resoruce show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await userCategoryService.findOneById({
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

/* find category has assing product */
export const categoryHasAssingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const results = await userCategoryService.categoryHasAssingProduct({
      _id: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* find category has assign subcategory */
export const categoryHasAssignSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const results = await userCategoryService.categoryHasAssignSubCategory({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
