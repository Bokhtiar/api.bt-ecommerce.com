import { Router } from "express";
import {loginValidators} from '../../validators/user/login.validators'
import {registrationValidator} from '../../validators/user/register.validators'
import * as userController from '../../controllers/user/user.controller'
import { userPermission } from "../../middleware/user.permission.middleware";

export const UserRouter: Router = Router();
UserRouter.post("/login", loginValidators,userController.login);
UserRouter.post("/register", registrationValidator,userController.registration);
UserRouter.get("/profile", userPermission,  userController.profile); 