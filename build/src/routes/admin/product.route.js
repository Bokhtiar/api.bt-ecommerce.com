"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_validators_1 = require("../../validators/admin/product.validators");
const productController = __importStar(require("../../controllers/admin/product.controller"));
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/regular", productController.regularProductIndex);
exports.productRouter.get("/flash-sale", productController.flashSaleProductIndex);
exports.productRouter.post("/", product_validators_1.productCreateUpdateValidator, productController.store);
exports.productRouter.get("/:id", productController.show);
exports.productRouter.put("/:id", product_validators_1.productCreateUpdateValidator, productController.update);
exports.productRouter.delete("/:id", productController.destory);
