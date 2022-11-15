import { Router } from "express";
import * as AuthController from '../../controllers/admin/auth.controller'

export const AuthRouter: Router = Router();
AuthRouter.post("/login",AuthController.login);
AuthRouter.post("/register",AuthController.register);
