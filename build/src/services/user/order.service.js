"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrderService = void 0;
const cart_model_1 = require("../../models/cart.model");
const order_model_1 = require("../../models/order.model");
/* specific user find order list */
const findAll = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({ user: _id });
});
/* find one by specific order */
const findOneById = ({ _id, user_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findOne({ _id: _id, user: user_id });
});
/* specific order cart items */
const orderCartItems = ({ user_id, order_id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find({ user: user_id, order: order_id });
});
exports.userOrderService = {
    findAll,
    findOneById,
    orderCartItems,
};
