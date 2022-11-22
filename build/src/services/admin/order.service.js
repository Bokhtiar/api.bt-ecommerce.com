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
exports.adminOrderService = void 0;
const cart_model_1 = require("../../models/cart.model");
const order_model_1 = require("../../models/order.model");
/* find all order */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find().sort({ _id: -1 });
});
/* find one by order */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findOne(_id);
});
/* cart items */
const cartItems = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find({ order: _id }).sort({ _id: -1 });
});
exports.adminOrderService = {
    findAll,
    cartItems,
    findOneById,
};
