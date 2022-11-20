"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
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
    icon: {
        type: String,
        default: null,
    },
    banner_image: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
