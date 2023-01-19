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
exports.releted_product = exports.show = exports.flashSaleProductIndex = exports.RegularProductIndex = void 0;
const mongoose_1 = require("mongoose");
const product_service_1 = require("../../services/user/product.service");
/* find all regular product resoruce */
const RegularProductIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield product_service_1.userProductService.findAllRegularProduct();
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
exports.RegularProductIndex = RegularProductIndex;
/* find All flash sale product */
const flashSaleProductIndex = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield product_service_1.userProductService.findAllFlashSaleProduct();
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
exports.flashSaleProductIndex = flashSaleProductIndex;
/* specific resource show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_service_1.userProductService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
/* product releted shows  */
const releted_product = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
    }
    catch (error) {
        if (error) {
            console.log(error);
        }
    }
});
exports.releted_product = releted_product;
