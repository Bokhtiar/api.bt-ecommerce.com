import { Router } from "express";
import * as productController from "../../controllers/user/product.controller";
export const userProductRouter: Router = Router();

userProductRouter.get("/regular", productController.RegularProductIndex);
userProductRouter.get("/flash-sale", productController.flashSaleProductIndex);
userProductRouter.get("/:id", productController.show);
userProductRouter.get("/releted/product/:id", productController.releted_product);
 