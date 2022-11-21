import { Router } from "express";
import * as categoryController from "../../controllers/user/category.controller";
export const userCategoryRouter: Router = Router();

userCategoryRouter.get("/", categoryController.index);
userCategoryRouter.get("/:id", categoryController.show);

userCategoryRouter.get(
  "/product/:id",
  categoryController.categoryHasAssingProduct
);

userCategoryRouter.get("/sub-category/:id", categoryController.categoryHasAssignSubCategory)
