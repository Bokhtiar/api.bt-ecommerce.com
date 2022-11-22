import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { adminOrderService } from "../../services/admin/order.service";

/* find all order by paginat */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await adminOrderService.findAll();
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* find one by specific order */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    /* order information */
    const orderShow = await adminOrderService.findOneById({
      _id: new Types.ObjectId(id),
    });

    /* order has been assign cart information */
    const cartItems = await adminOrderService.cartItems({
      _id: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: true,
      data: {'order info':orderShow, 'cart items':cartItems},
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
