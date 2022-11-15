"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
/**Admin database field */
exports.adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true,
});
/**Database name */
exports.Admin = (0, mongoose_1.model)("Admin", exports.adminSchema);
