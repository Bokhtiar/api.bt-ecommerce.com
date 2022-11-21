import { userSubCategoryService } from "../../services/user/subCategory.service";
import { Types } from "mongoose";
import { Response, Request, NextFunction } from "express";

/* find all resource */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await userSubCategoryService.findAll();
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const subcategoryHasAssingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const results = await userSubCategoryService.subCategoryHasAssignProduct({
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
