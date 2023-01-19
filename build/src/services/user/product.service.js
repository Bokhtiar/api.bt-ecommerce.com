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
exports.userProductService = void 0;
const product_model_1 = require("../../models/product.model");
/* find all regular product */
const findAllRegularProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({ is_product: "regular" });
});
/* find all flash sale product */
const findAllFlashSaleProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({ is_product: "flash_sale" });
});
/* find one by specific resource */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(_id).populate('category', 'name');
});
/* find all product */
const findAllReleted = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({});
});
exports.userProductService = {
    findAllRegularProduct,
    findAllFlashSaleProduct,
    findOneById,
};
