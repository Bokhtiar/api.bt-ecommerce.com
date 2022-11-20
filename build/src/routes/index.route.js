"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const admin_route_1 = require("./admin/admin.route");
const product_route_1 = require("./admin/product.route");
const category_route_1 = require("./admin/category.route");
const subCategory_route_1 = require("./admin/subCategory.route");
const user_route_1 = require("./user/user.route");
const category_route_2 = require("./user/category.route");
exports.AppRouter = (0, express_1.Router)();
exports.AppRouter.use("/admin/auth", admin_route_1.AdminRouter);
exports.AppRouter.use("/admin/category", category_route_1.categoryRouter);
exports.AppRouter.use("/admin/sub-category", subCategory_route_1.subCategoryRoute);
exports.AppRouter.use("/admin/Product", product_route_1.productRouter);
/* user routes */
exports.AppRouter.use("/user/auth", user_route_1.UserRouter);
exports.AppRouter.use("/category", category_route_2.userCategoryRouter);
