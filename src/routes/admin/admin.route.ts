import { Router } from "express";
import { loginValidators } from "../../validators/admin/login.validators";
import * as AuthController from "../../controllers/admin/admin.controller";

export const AdminRouter: Router = Router();
AdminRouter.post("/login", loginValidators, AuthController.login);
AdminRouter.post("/register", loginValidators, AuthController.register);
