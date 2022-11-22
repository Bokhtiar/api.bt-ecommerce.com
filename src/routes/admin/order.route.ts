import { Router } from "express";
import { adminPermission } from "../../middleware/admin.permission.middleware";

import * as orderController from "../../controllers/admin/order.controller";

export const adminOrderRouter: Router = Router();

adminOrderRouter.get("/", adminPermission, orderController.index);
adminOrderRouter.get("/:id", adminPermission, orderController.show);
