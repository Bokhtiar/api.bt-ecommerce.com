import { Types } from "mongoose";
import { Cart } from "../../models/cart.model";
import { Order } from "../../models/order.model";
import { ICart } from "../../types/user/cart.types";
import { IOrder, IOrderCreate } from "../../types/user/order.types";

/* specific user find order list */
const findAll = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IOrder[] | []> => {
  return await Order.find({ user: _id });
};

/* find one by specific order */
const findOneById = async ({
  _id,
  user_id,
}: {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
}): Promise<IOrder | null> => {
  return await Order.findOne({ _id: _id, user: user_id });
};

/* specific order cart items */
const orderCartItems = async ({
  user_id,
  order_id,
}: {
  user_id: Types.ObjectId;
  order_id: Types.ObjectId;
}): Promise<ICart[] | []> => {
  return await Cart.find({ user: user_id, order: order_id });
};

export const userOrderService = {
  findAll,
  findOneById,
  orderCartItems,
};
