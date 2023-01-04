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
exports.cartService = void 0;
const cart_model_1 = require("../../models/cart.model");
/* specific user find cart */
const findAll = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cart_model_1.Cart.find({ user: _id, order: null }).populate('product', 'name sale_price image quantity');
});
/* cart store documents */
const addToCart = ({ product_id, user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    /* find one cart already exist */
    const existCart = yield cart_model_1.Cart.findOne({ user: user_id, product: product_id, order: null });
    if (existCart) {
        let existQty;
        existQty = existCart.quantity;
        return yield cart_model_1.Cart.findByIdAndUpdate(existCart._id, { $set: { quantity: existQty + 1 } });
    }
    else {
        const newCart = new cart_model_1.Cart({
            user: user_id,
            product: product_id
        });
        return yield newCart.save();
    }
});
exports.cartService = {
    findAll,
    addToCart,
};
