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
const admin_1 = require("../../services/admin");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
/* List of resources */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield admin_1.service.Category.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        /* Search from query */
        if (searchQuery) {
            results = yield admin_1.service.Category.searchByKey(searchQuery.toString());
        }
        else {
            results = yield admin_1.service.Category.findAll({ page, limit });
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
        const isExistName = yield admin_1.service.Category.findOneByKey({ name: name });
        if (isExistName) {
            return res.status(409).json({
                status: false,
                message: "Category already created.",
            });
        }
        const documents = {
            name,
            icon,
            banner_image,
        };
        yield admin_1.service.Category.resourceCreate({
            data: Object.assign({}, documents)
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
        const result = yield admin_1.service.Category.findOneById({
            _id: new mongoose_1.Types.ObjectId(id)
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
        const existWithName = yield admin_1.service.Category.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json({
                status: false,
                message: "This name already exists.",
            });
        }
        const documents = {
            name,
            icon,
            banner_image,
        };
        yield admin_1.service.Category.findByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            data: Object.assign({}, documents)
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
        const availableCategory = yield admin_1.service.Category.findOneById({
            _id: new mongoose_1.Types.ObjectId(id)
        });
        if (!availableCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found"
            });
        }
        yield admin_1.service.Category.findByIdAndDelete({
            _id: new mongoose_1.Types.ObjectId(id)
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
