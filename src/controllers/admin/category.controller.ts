import { Request, Response, NextFunction } from "express";
import {paginateQueryParams} from '../../helpers/pagination.helper'

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


  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};