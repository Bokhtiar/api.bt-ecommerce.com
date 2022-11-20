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
exports.adminProductService = exports.searchByKey = void 0;
const slug = require("slug");
const product_model_1 = require("../../models/product.model");
/* count all */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.countDocuments();
});
/* specific reosurce  find one by key */
const findOnebykey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findOne(Object.assign({}, params)).populate("category", "name").populate("subCategory", "name");
    ;
});
/* find One specific resource */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findById(_id).populate("category", "name").populate("subCategory", "name");
});
/* find all reosurce by paginate */
const findAll = ({ page, limit, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/* create new resrouce */
const createProduct = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newResource = new product_model_1.Product({
        category: documents.category,
        subCategory: documents.subCategory,
        name: documents.name,
        slug: slug(documents.name),
        sale_price: documents.sale_price,
        regular_price: documents.regular_price,
        image: documents.image,
        description: documents.description,
        quantity: documents.quantity,
        discount: documents.discount,
    });
    return yield newResource.save();
});
/* find specific resource by id and updated keys */
const findByIdAndUpdate = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndUpdate(_id, { $set: Object.assign({}, documents) });
});
/* find sepecific reosurce by id and delete */
const findByIdAndDelete = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.findByIdAndDelete(_id);
});
/* Search by key */
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield product_model_1.Product.find({
        $or: [{ name: queryRegExp }, { slug: queryRegExp }],
    }, {
        created_by: 0,
    });
});
exports.searchByKey = searchByKey;
exports.adminProductService = {
    findAll,
    countAll,
    searchByKey: exports.searchByKey,
    findOneById,
    findOnebykey,
    createProduct,
    findByIdAndUpdate,
    findByIdAndDelete,
};
