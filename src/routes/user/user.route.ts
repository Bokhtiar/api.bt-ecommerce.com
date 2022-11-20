import { Router } from "express";
import {loginValidators} from '../../validators/user/login.validators'
import {registrationValidator} from '../../validators/user/register.validators'
import * as userController from '../../controllers/user/user.controller'

export const UserRouter: Router = Router();
UserRouter.post("/login", loginValidators,userController.login);
UserRouter.post("/register", registrationValidator,userController.registration);
