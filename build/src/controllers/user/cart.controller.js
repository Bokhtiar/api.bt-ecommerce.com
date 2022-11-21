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
exports.store = void 0;
const mongoose_1 = require("mongoose");
const cart_service_1 = require("../../services/user/cart.service");
/* store documents */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; //product id
        const userID = req.user.id;
        console.log("user", userID);
        const result = yield cart_service_1.cartService.addToCart({ user_id: new mongoose_1.Types.ObjectId(userID), product_id: new mongoose_1.Types.ObjectId(id) });
        res.status(201).json({
            status: true,
            data: result,
            message: "Cart added"
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
