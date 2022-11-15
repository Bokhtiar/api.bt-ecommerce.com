"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("./admin/auth.route");
exports.AppRouter = (0, express_1.Router)();
exports.AppRouter.use('/auth', auth_route_1.AuthRouter);
