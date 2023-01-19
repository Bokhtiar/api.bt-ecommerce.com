import { NextFunction, Request, Response } from "express";
import { adminProductService } from "../../services/admin/product.service";
import {
  IProductCreateUpdate,
} from "../../types/admin/product.types";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { Types } from "mongoose";

/* find all resource by paginate */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];

    const totalItems = await adminProductService.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    /* Search from query */
    if (searchQuery) {
      results = await adminProductService.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await adminProductService.findAll({ page, limit });
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

/* store new resoruce */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      subCategory,
      name,
      sale_price,
      regular_price,
      image,
      description,
      quantity,
      discount,
      is_product
    } = req.body;

    /* check exist name*/
    const nameExist = await adminProductService.findOnebykey({ name });
    if (nameExist) {
      return res.status(409).json({
        status: true,
        message: "Product name already exist",
      });
    }

    enum productType {
      regular = "regular",
      flash_sale = "flash_sale"
    }
    const documents: IProductCreateUpdate = {
      category :  new Types.ObjectId(category),
      subCategory: new Types.ObjectId(subCategory),
      name,
      sale_price,
      regular_price,
      image,
      description,
      quantity,
      discount,
      is_product: productType.regular
    };

    await adminProductService.createProduct({ documents: { ...documents } });
    res.status(201).json({
      status: true,
      message: "Product created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* show specific resource by id */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminProductService.findOneById({
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
    const {
      category,
      subCategory,
      name,
      sale_price,
      regular_price,
      image,
      description,
      quantity,
      discount,
      is_product,
    } = req.body;

    /* check unique name */
    const existWithName = await adminProductService.findOnebykey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json({
        status: false,
        message: "This name already exists.",
      });
    }

    const documents: IProductCreateUpdate = {
      category,
      subCategory,
      name,
      sale_price,
      regular_price,
      image,
      description,
      quantity,
      discount,
      is_product,
    };

    await adminProductService.findByIdAndUpdate({
      _id: new Types.ObjectId(id),
      documents: { ...documents },
    });

    res.status(200).json({
      status: true,
      message: "Product Updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* destroy specific resource */
export const destory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await adminProductService.findByIdAndDelete({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      message: "Product Deleted.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
