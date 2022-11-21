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
exports.categoryHasAssingProduct = exports.show = exports.index = void 0;
const mongoose_1 = require("mongoose");
const category_service_1 = require("../../services/user/category.service");
/* find all resource */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resutls = yield category_service_1.userCategoryService.findAll();
        res.status(200).json({
            status: true,
            data: resutls,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
/* find specific resoruce show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_service_1.userCategoryService.findOneById({
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
/* find category has assing product */
const categoryHasAssingProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const results = yield category_service_1.userCategoryService.categoryHasAssingProduct({ _id: new mongoose_1.Types.ObjectId(id) });
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
exports.categoryHasAssingProduct = categoryHasAssingProduct;
