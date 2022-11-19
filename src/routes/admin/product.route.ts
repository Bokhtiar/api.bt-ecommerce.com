import { Router } from "express";
import {createUpdate} from '../../validators/admin/product.validators'

import * as productController from "../../controllers/admin/product.controller";

export const productRouter: Router = Router();

productRouter.get("/", productController.index);
productRouter.post("/", createUpdate, productController.store);
productRouter.get("/:id", productController.show);
productRouter.put("/:id",createUpdate, productController.update);
productRouter.delete("/:id", productController.destory);

