import { Router } from "express";
import { AuthRouter } from "./admin/auth.route";
import { categoryRouter } from "./admin/category.route";
import {isAdmin} from '../middleware/admin.permission.middleware'

export const AppRouter: Router = Router();
AppRouter.use("/auth", AuthRouter);
AppRouter.use("/category", isAdmin, categoryRouter);
