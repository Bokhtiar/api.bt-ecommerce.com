import { Router } from "express";
import { loginValidators } from "../../validators/admin/login.validators";
import * as AdminAuthController from "../../controllers/admin/admin.controller";

export const AdminRouter: Router = Router();
AdminRouter.post("/login", loginValidators, AdminAuthController.login);
AdminRouter.post("/register", loginValidators, AdminAuthController.register);
