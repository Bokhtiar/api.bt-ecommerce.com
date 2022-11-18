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
exports.searchByKey = exports.findByIdAndDelete = exports.findByIdAndUpdate = exports.resourceCreate = exports.findById = exports.findOneByKey = exports.findAll = exports.countAll = void 0;
const slug = require('slug');
const models_1 = require("../../models");
/**Category count */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Models.Category.countDocuments();
});
exports.countAll = countAll;
/* find resources by paginate */
const findAll = ({ page, limit, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
exports.findAll = findAll;
/**specific resource findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findOne(Object.assign({}, params));
});
exports.findOneByKey = findOneByKey;
/**specific reosouce findById */
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findById(id);
});
exports.findById = findById;
/**create resource */
const resourceCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = new models_1.Models.Category({
        name: data.name,
        slug: slug(data.name),
        icon: data.icon,
        banner_image: data.banner_image,
    });
    return yield newCategory.save();
});
exports.resourceCreate = resourceCreate;
/**findByIdAndUpdate resource  */
const findByIdAndUpdate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findByIdAndUpdate(id, { $set: Object.assign({}, data) });
});
exports.findByIdAndUpdate = findByIdAndUpdate;
/**specific resource findByIdAndDelete  */
const findByIdAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findByIdAndDelete(id);
});
exports.findByIdAndDelete = findByIdAndDelete;
/* Search by key */
const searchByKey = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield models_1.Models.Category.find({
        $and: [{}, { $or: [{ name: queryRegExp }, { slug: queryRegExp }] }],
    }, {
        created_by: 0,
        createdAt: 0,
        updatedAt: 0,
    });
});
exports.searchByKey = searchByKey;
