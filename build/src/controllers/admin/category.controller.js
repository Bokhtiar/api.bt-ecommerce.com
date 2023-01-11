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
const pagination_helper_1 = require("../../helpers/pagination.helper");
const helpers_1 = require("../../helpers");
/* List of resources */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield category_service_1.adminCategoryService.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        /* Search from query */
        if (searchQuery) {
            results = yield category_service_1.adminCategoryService.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield category_service_1.adminCategoryService.findAll({ page, limit });
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
/* store resource  */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, banner_image } = req.body;
        /* check already exist name */
        const isExistName = yield category_service_1.adminCategoryService.findOneByKey({ name: name });
        if (isExistName) {
            return res.status(409).json(yield (0, helpers_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Category name already exists.",
                    },
                ],
            }));
        }
        const documents = {
            name,
            icon,
            banner_image,
        };
        //await mqProducer({ queueName: "category", message: documents });
        yield category_service_1.adminCategoryService.categoryCreate({
            documents: Object.assign({}, documents),
        });
        res.status(201).json({
            status: true,
            message: "Category Created.",
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.store = store;
/* show specific resource */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_service_1.adminCategoryService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: result,
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.show = show;
/* update specific resource */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon, banner_image } = req.body;
        /* check unique name */
        const existWithName = yield category_service_1.adminCategoryService.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json(yield (0, helpers_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Category name already exists.",
                    },
                ],
            }));
        }
        const documents = {
            name,
            icon,
            banner_image,
        };
        yield category_service_1.adminCategoryService.findOneByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: Object.assign({}, documents),
        });
        res.status(200).json({
            status: true,
            message: "Category updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* destroy category */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* check avaialbe category */
        const availableCategory = yield category_service_1.adminCategoryService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        if (!availableCategory) {
            return res.status(404).json(yield (0, helpers_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Category",
                        message: "Category not found.",
                    },
                ],
            }));
        }
        yield category_service_1.adminCategoryService.findOneByIdAndDelete({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            message: "Category deleted.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destroy = destroy;
