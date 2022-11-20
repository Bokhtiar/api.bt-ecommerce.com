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
exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
const mongoose_1 = require("mongoose");
const category_service_1 = require("../../services/admin/category.service");
const subCategory_service_1 = require("../../services/admin/subCategory.service");
const pagination_helper_1 = require("../../helpers/pagination.helper");
/* find all resource by paginate */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield subCategory_service_1.adminSubCategoryService.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        /* Search from query */
        if (searchQuery) {
            results = yield subCategory_service_1.adminSubCategoryService.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield subCategory_service_1.adminSubCategoryService.findAll({ page, limit });
        }
        res.status(200).json({
            status: true,
            data: results,
            paginate: (0, pagination_helper_1.paginate)({ total_items: totalItems, page, limit }),
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.index = index;
/* store new resource */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, name, logo, banner_image } = req.body;
        /* check name exists  */
        const nameExists = yield subCategory_service_1.adminSubCategoryService.findOneByKey({ name });
        if (nameExists) {
            return res.status(409).json({
                status: false,
                message: "Name already exists",
            });
        }
        /* check available category */
        const availableCategory = yield category_service_1.adminCategoryService.findOneById({
            _id: new mongoose_1.Types.ObjectId(category),
        });
        if (!availableCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found.",
            });
        }
        const documents = {
            category: new mongoose_1.Types.ObjectId(category),
            name,
            logo,
            banner_image,
        };
        yield subCategory_service_1.adminSubCategoryService.createResource({ data: Object.assign({}, documents) });
        res.status(201).json({
            status: true,
            message: "Sub category created.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
/* spacific resource show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield subCategory_service_1.adminSubCategoryService.findOneById({
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
/* spacific reousrce update */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { category, name, logo, banner_image } = req.body;
        /* check unique name */
        const existWithName = yield subCategory_service_1.adminSubCategoryService.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json({
                status: false,
                message: "This name already exists.",
            });
        }
        /* check available category */
        const availableCategory = yield category_service_1.adminCategoryService.findOneById({
            _id: new mongoose_1.Types.ObjectId(category),
        });
        if (!availableCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found.",
            });
        }
        const document = {
            category: new mongoose_1.Types.ObjectId(category),
            name,
            logo,
            banner_image,
        };
        yield subCategory_service_1.adminSubCategoryService.findByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            data: Object.assign({}, document),
        });
        res.status(200).json({
            status: true,
            message: "Sub category updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* specific reource delete */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield subCategory_service_1.adminSubCategoryService.findByIdAndDelete({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            message: "Sub category deleted."
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destroy = destroy;
