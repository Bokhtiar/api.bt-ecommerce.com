import { Router } from "express";

import { productCreateUpdateValidator } from "../../validators/admin/product.validators";

import * as productController from "../../controllers/admin/product.controller";

export const productRouter: Router = Router();

productRouter.get("/regular", productController.regularProductIndex);
productRouter.get("/flash-sale", productController.flashSaleProductIndex);
productRouter.post("/", productCreateUpdateValidator, productController.store);
productRouter.get("/:id", productController.show);
productRouter.put("/:id", productCreateUpdateValidator, productController.update);
productRouter.delete("/:id", productController.destory);
 