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
exports.userCategoryService = void 0;
const category_model_1 = require("../../models/category.model");
/* find all category */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.find({}, { createdAt: 0, updatedAt: 0, banner_image: 0 });
});
/* find specific category */
const findOneById = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findById(_id);
});
exports.userCategoryService = {
    findAll,
    findOneById
};
