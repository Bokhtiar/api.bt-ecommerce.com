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
exports.store = exports.index = void 0;
const admin_1 = require("../../services/admin");
const pagination_helper_1 = require("../../helpers/pagination.helper");
/* List of resources */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        /* Search from query */
        // if (searchQuery) {
        //   const results = await services.company.searchByKey(
        //     searchQuery.toString()
        //   );
        const totalItems = yield admin_1.service.Category.countAll();
        const results = yield admin_1.service.Category.findAll({ page, limit });
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
/**resource store */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, banner_image } = req.body;
        /**Check already exist name */
        const isExistName = yield admin_1.service.Category.findOneByKey({ name: name });
        if (isExistName) {
            return res.status(409).json({
                status: false,
                message: "Category already created.",
            });
        }
        /**store documents */
        const documents = {
            name,
            icon,
            banner_image,
        };
        yield admin_1.service.Category.resourceCreate(documents);
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
