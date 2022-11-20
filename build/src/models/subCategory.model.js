"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = require("mongoose");
const subCategorySchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    logo: {
        type: String,
        trim: true,
        default: null,
    },
    banner_image: {
        type: String,
        trim: true,
        default: null,
    },
}, {
    timestamps: true,
});
exports.SubCategory = (0, mongoose_1.model)("SubCategory", subCategorySchema);
