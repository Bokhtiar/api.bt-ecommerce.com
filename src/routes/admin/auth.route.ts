import { Router } from "express";
import { loginValidators } from "../../validators/admin/login.validators";
import * as AuthController from "../../controllers/admin/auth.controller";

export const AuthRouter: Router = Router();
AuthRouter.post("/login", loginValidators, AuthController.login);
AuthRouter.post("/register", loginValidators, AuthController.register);
