import { Router } from "express";

import { productCreateUpdateValidator } from "../../validators/admin/product.validators";

import * as productController from "../../controllers/admin/product.controller";

export const productRouter: Router = Router();

productRouter.get("/", productController.index);
productRouter.post("/", productCreateUpdateValidator, productController.store);
productRouter.get("/:id", productController.show);
productRouter.put("/:id", productCreateUpdateValidator, productController.update);
productRouter.delete("/:id", productController.destory);
 