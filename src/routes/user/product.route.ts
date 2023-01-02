import { Router } from "express";
import * as productController from "../../controllers/user/product.controller";
export const userProductRouter: Router = Router();

userProductRouter.get("/", productController.index);
userProductRouter.get("/:id", productController.show);
userProductRouter.get("/releted/product/:id", productController.releted_product);
