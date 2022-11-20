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
exports.destory = exports.update = exports.show = exports.store = exports.index = void 0;
const product_service_1 = require("../../services/admin/product.service");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
/* find all resource by paginate */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield product_service_1.adminProductService.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        /* Search from query */
        if (searchQuery) {
            results = yield product_service_1.adminProductService.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield product_service_1.adminProductService.findAll({ page, limit });
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
/* store new resoruce */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, subCategory, name, sale_price, regular_price, image, description, quantity, discount, } = req.body;
        /* check exist name*/
        const nameExist = yield product_service_1.adminProductService.findOnebykey({ name });
        if (nameExist) {
            return res.status(409).json({
                status: true,
                message: "Product name already exist",
            });
        }
        const documents = {
            category: new mongoose_1.Types.ObjectId(category),
            subCategory: new mongoose_1.Types.ObjectId(subCategory),
            name,
            sale_price,
            regular_price,
            image,
            description,
            quantity,
            discount,
        };
        yield product_service_1.adminProductService.createProduct({ documents: Object.assign({}, documents) });
        res.status(201).json({
            status: true,
            message: "Product created.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
/* show specific resource by id */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_service_1.adminProductService.findOneById({
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
        const { category, subCategory, name, sale_price, regular_price, image, description, quantity, discount, } = req.body;
        /* check unique name */
        const existWithName = yield product_service_1.adminProductService.findOnebykey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json({
                status: false,
                message: "This name already exists.",
            });
        }
        const documents = {
            category,
            subCategory,
            name,
            sale_price,
            regular_price,
            image,
            description,
            quantity,
            discount,
        };
        yield product_service_1.adminProductService.findByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: Object.assign({}, documents),
        });
        res.status(200).json({
            status: true,
            message: "Product Updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* destroy specific resource */
const destory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield product_service_1.adminProductService.findByIdAndDelete({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            message: "Product Deleted.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destory = destory;
