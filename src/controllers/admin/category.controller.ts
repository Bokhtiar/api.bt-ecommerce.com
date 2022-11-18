import { service } from "../../services/admin";
import { Request, Response, NextFunction } from "express";
import { paginateQueryParams } from "../../helpers/pagination.helper";


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
    //   const results = await services.company.searchByKey(
    //     searchQuery.toString()
    //   );

    // const totalItems = await services.company.countAll();
    // const results = await services.company.findAll({ page, limit });
    res.status(200).json({
      status: true,
      message: "ok",
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
