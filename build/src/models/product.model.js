"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        ref: "Category",
        required: true,
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        ref: "SubCategory",
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        trim: true,
        required: true,
    },
    sale_price: {
        type: Number,
        trim: true,
        required: true,
    },
    regular_price: {
        type: Number,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        default: false,
    },
    quantity: {
        type: Number,
        trim: true,
        default: false,
    },
    discount: {
        type: Number,
        trim: true,
        default: false,
    },
    is_product: {
        type: String,
        enum: ["regular", "flash_sale"],
        default: "flash_sale",
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
