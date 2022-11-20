import { Router } from "express";
import { AdminRouter } from "./admin/admin.route";
import { productRouter } from "./admin/product.route";
import { categoryRouter } from "./admin/category.route";
import { subCategoryRoute } from './admin/subCategory.route';
import { UserRouter } from "./user/user.route";
import { userCategoryRouter } from "./user/category.route";


export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", AdminRouter);
AppRouter.use("/category", categoryRouter);
AppRouter.use("/sub-category", subCategoryRoute)
AppRouter.use("/Product", productRouter);

/* user routes */
AppRouter.use("/user/auth", UserRouter);
AppRouter.use("/user/category", userCategoryRouter )
