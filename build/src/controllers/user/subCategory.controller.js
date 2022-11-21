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
exports.subcategoryHasAssingProduct = exports.index = void 0;
const subCategory_service_1 = require("../../services/user/subCategory.service");
const mongoose_1 = require("mongoose");
/* find all resource */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield subCategory_service_1.userSubCategoryService.findAll();
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
const subcategoryHasAssingProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield subCategory_service_1.userSubCategoryService.subCategoryHasAssignProduct({
            _id: new mongoose_1.Types.ObjectId(id),
        });
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
exports.subcategoryHasAssingProduct = subcategoryHasAssingProduct;
