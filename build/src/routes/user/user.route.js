"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const login_validators_1 = require("../../validators/user/login.validators");
const register_validators_1 = require("../../validators/user/register.validators");
const userController = __importStar(require("../../controllers/user/user.controller"));
const user_permission_middleware_1 = require("../../middleware/user.permission.middleware");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/login", login_validators_1.loginValidators, userController.login);
exports.UserRouter.post("/register", register_validators_1.registrationValidator, userController.registration);
exports.UserRouter.get("/profile", user_permission_middleware_1.userPermission, userController.profile);
