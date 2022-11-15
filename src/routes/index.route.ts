import { Router } from "express";
import {AuthRouter} from './admin/auth.route'
import express, { Express, Request, Response } from "express";



export const AppRouter: Router = Router();
AppRouter.use('/auth', AuthRouter)