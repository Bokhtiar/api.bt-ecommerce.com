import { Router } from "express";
import * as cartController from "../../controllers/user/cart.controller";
export const cartRouter: Router = Router();

cartRouter.post("/:id", cartController.store);