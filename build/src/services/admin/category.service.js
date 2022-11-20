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
exports.adminCategoryService = void 0;
const slug = require("slug");
const category_model_1 = require("../../models/category.model");
/* count all */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.Category.countDocuments();
});
/* find resources by paginate */
const findAll = ({ page, limit, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/* specific resource findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findOne(Object.assign({}, params));
});
/* specific reosouce findOneById */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findById(_id);
});
/* create new resource */
const categoryCreate = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = new category_model_1.Category({
        name: documents.name,
        slug: slug(documents.name),
        icon: documents.icon,
        banner_image: documents.banner_image,
    });
    return yield newCategory.save();
});
/* specific one resource findByIdAndUpdate */
const findOneByIdAndUpdate = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findByIdAndUpdate(_id, {
        $set: {
            name: documents.name,
            slug: slug(documents.name),
            icon: documents.icon,
            banner_image: documents.banner_image,
        },
    });
});
/* specific resource findByIdAndDelete  */
const findOneByIdAndDelete = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.Category.findByIdAndDelete(_id);
});
/* Search by key */
const searchByKey = ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield category_model_1.Category.find({
        $or: [{ name: queryRegExp }, { slug: queryRegExp }],
    }, {
        created_by: 0,
    });
});
exports.adminCategoryService = {
    findAll,
    countAll,
    searchByKey,
    findOneById,
    findOneByKey,
    categoryCreate,
    findOneByIdAndUpdate,
    findOneByIdAndDelete,
};
