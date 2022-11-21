import { Router } from "express";
import { UserRouter } from "./user/user.route";
import { AdminRouter } from "./admin/admin.route";
import { productRouter } from "./admin/product.route";
import { categoryRouter } from "./admin/category.route";
import { userProductRouter } from "./user/product.route";
import { userCategoryRouter } from "./user/category.route";
import { subCategoryRoute } from "./admin/subCategory.route";
import { userSubCategoryRouter } from "./user/subCategory.route";
import { adminPermission } from "../middleware/admin.permission.middleware";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", AdminRouter);
AppRouter.use("/admin/Product", adminPermission, productRouter);
AppRouter.use("/admin/category", adminPermission, categoryRouter);
AppRouter.use("/admin/sub-category", adminPermission, subCategoryRoute);

/* user routes */
AppRouter.use("/user/auth", UserRouter);
AppRouter.use("/product", userProductRouter);
AppRouter.use("/category", userCategoryRouter);
AppRouter.use("/sub-category", userSubCategoryRouter);
