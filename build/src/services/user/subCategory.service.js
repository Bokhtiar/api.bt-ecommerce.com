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
exports.userSubCategoryService = void 0;
const product_model_1 = require("../../models/product.model");
const subCategory_model_1 = require("../../models/subCategory.model");
/* find all subcategory */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield subCategory_model_1.SubCategory.find();
});
/* specific resource by find one */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subCategory_model_1.SubCategory.findById(_id);
});
/* subcategory has assign product */
const subCategoryHasAssignProduct = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find({ subCategory: _id });
});
exports.userSubCategoryService = {
    findAll,
    findOneById,
    subCategoryHasAssignProduct,
};
