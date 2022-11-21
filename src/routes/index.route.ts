import { Router } from "express";
import { AdminRouter } from "./admin/admin.route";
import { productRouter } from "./admin/product.route";
import { categoryRouter } from "./admin/category.route";
import { subCategoryRoute } from './admin/subCategory.route';
import { UserRouter } from "./user/user.route";
import { userCategoryRouter } from "./user/category.route";
import { userSubCategoryRouter } from "./user/subCategory.route";


export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", AdminRouter);
AppRouter.use("/admin/category", categoryRouter);
AppRouter.use("/admin/sub-category", subCategoryRoute)
AppRouter.use("/admin/Product", productRouter);

/* user routes */
AppRouter.use("/user/auth", UserRouter);
AppRouter.use("/category", userCategoryRouter )
AppRouter.use("/sub-category", userSubCategoryRouter)

