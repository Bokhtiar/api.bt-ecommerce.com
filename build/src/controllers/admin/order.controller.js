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
exports.show = exports.index = void 0;
const mongoose_1 = require("mongoose");
const order_service_1 = require("../../services/admin/order.service");
/* find all order by paginat */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield order_service_1.adminOrderService.findAll();
        res.status(200).json({
            status: true,
            data: results,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
/* find one by specific order */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* order information */
        const orderShow = yield order_service_1.adminOrderService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        /* order has been assign cart information */
        const cartItems = yield order_service_1.adminOrderService.cartItems({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: { 'order info': orderShow, 'cart items': cartItems },
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
