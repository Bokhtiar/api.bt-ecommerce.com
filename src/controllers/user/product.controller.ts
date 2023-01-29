import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { userProductService } from "../../services/user/product.service";

/* find all regular product resoruce */
export const RegularProductIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await userProductService.findAllRegularProduct();
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* find All flash sale product */
export const flashSaleProductIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await userProductService.findAllFlashSaleProduct();
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resource show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await userProductService.findOneById({
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

/* product releted shows  */
export const releted_product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const results = await userProductService.findAllReleted({_id: new Types.ObjectId(id)})
    
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error)
    }
  }
};
