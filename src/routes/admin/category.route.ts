import { Router } from "express";
import {validator} from '../../validators/admin'
import * as categoryController from '../../controllers/admin/category.controller'

export const categoryRouter: Router = Router();
categoryRouter.get("/",categoryController.index);
