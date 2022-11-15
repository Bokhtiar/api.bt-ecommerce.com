import { Router } from "express";
import {validator} from '../../validators/admin'
import * as AuthController from '../../controllers/admin/auth.controller'

export const AuthRouter: Router = Router();
AuthRouter.post("/login",validator.login.createUpdate,AuthController.login);
AuthRouter.post("/register",validator.register.createUpdate, AuthController.register);
