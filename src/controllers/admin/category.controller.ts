import { service } from "../../services/admin";
import { Request, Response, NextFunction } from "express";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { Types } from "mongoose";

/* List of resources */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    /* Search from query */
    // if (searchQuery) {
    //   const results = await service.Category.searchByKey(
    //     searchQuery.toString()
    //   );

    const totalItems = await service.Category.countAll();
    const results = await service.Category.findAll({ page, limit });

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

/**resource store */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, banner_image } = req.body;

    /**Check already exist name */
    const isExistName = await service.Category.findOneByKey({ name: name });
    if (isExistName) {
      return res.status(409).json({
        status: false,
        message: "Category already created.",
      });
    }

    /**store documents */
    const documents = {
      name,
      icon,
      banner_image,
    };

    await service.Category.resourceCreate(documents);
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

/**show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await service.Category.findById({
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

/**update */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, icon, banner_image } = req.body;

    /* Check unique name */
    const existWithName = await service.Category.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      res.status(409).json({
        status: true,
        message: "This name already exists.",
      });
    }

    const documents = {
      name,
      icon,
      banner_image,
    };
    await service.Category.findByIdAndUpdate(id, documents);
    res.status(200).json({
      status: true,
      message: "Category updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/**category destroy */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await service.Category.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Category deleted.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
