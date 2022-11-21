import { Router } from "express";
import * as subCategoryController from "../../controllers/user/subCategory.controller";
export const userSubCategoryRouter: Router = Router();

userSubCategoryRouter.get("/", subCategoryController.index);


userSubCategoryRouter.get(
  "/product/:id",
  subCategoryController.subcategoryHasAssingProduct
);
