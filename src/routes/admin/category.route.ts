import { Router } from "express";
import { validator } from "../../validators/admin";

import * as categoryController from "../../controllers/admin/category.controller";

export const categoryRouter: Router = Router();

categoryRouter.get("/", categoryController.index);

categoryRouter.post(
  "/",
  validator.category.createUpdate,
  categoryController.store
);

categoryRouter.get("/:id", categoryController.show);

categoryRouter.put(
  "/:id",
  validator.category.createUpdate,
  categoryController.update
);

categoryRouter.delete("/:id", categoryController.destroy)