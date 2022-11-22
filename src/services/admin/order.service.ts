import { IOrder } from "../../types/admin/order.types";
import {ICart} from '../../types/admin/cart.types'
import {Cart} from '../../models/cart.model'
import { Order } from "../../models/order.model";
import { Types } from "mongoose";

/* find all order */
const findAll = async (): Promise<IOrder[] | []> => {
  return await Order.find().sort({ _id: -1 });
};

/* find one by order */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IOrder | null> => {
  return await Order.findOne(_id);
};

/* cart items */
const cartItems = async({_id}:{_id: Types.ObjectId}):Promise<ICart[] | []> => {
    return await Cart.find({order: _id}).sort({_id: -1})
}

export const adminOrderService = {
  findAll,
  cartItems,
  findOneById,
};
