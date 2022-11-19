"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
/**product table field decleard */
const productSchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        ref: "Category",
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
    discrount: {
        type: Number,
        trim: true,
        default: false,
    },
}, {
    timestamps: true,
});
/**Databae name deaclear */
exports.Product = (0, mongoose_1.model)("Product", productSchema);
