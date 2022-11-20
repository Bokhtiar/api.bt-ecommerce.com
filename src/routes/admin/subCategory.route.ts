import { Router } from "express";
import * as subCategoryController from "../../controllers/admin/subCategory.controller";
import { SubCategoryCreateUpdate } from "../../validators/admin/subCategory.validators";

export const subCategoryRoute: Router = Router();

subCategoryRoute.get("/", subCategoryController.index);
subCategoryRoute.post(
  "/",
  SubCategoryCreateUpdate,
  subCategoryController.store
);
subCategoryRoute.get("/:id", subCategoryController.show);
subCategoryRoute.put(
  "/:id",
  SubCategoryCreateUpdate,
  subCategoryController.update
);

subCategoryRoute.delete("/:id", subCategoryController.destroy);
