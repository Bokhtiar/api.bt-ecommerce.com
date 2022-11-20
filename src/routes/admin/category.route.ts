import { Router } from "express";
import { categoryCreateUpdateValidator } from "../../validators/admin/category.validators";

import * as categoryController from "../../controllers/admin/category.controller";

export const categoryRouter: Router = Router();

categoryRouter.get("/", categoryController.index);

categoryRouter.post(
  "/",
  categoryCreateUpdateValidator,
  categoryController.store
);

categoryRouter.get("/:id", categoryController.show);

categoryRouter.put(
  "/:id",
  categoryCreateUpdateValidator,
  categoryController.update
);

categoryRouter.delete("/:id", categoryController.destroy);
