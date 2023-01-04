"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = exports.login = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../../services/user/user.service");
/* login as a user */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* check account is exists  */
        const account = yield user_service_1.userAuthService.findOneByKey({ email });
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }
        /* compare with password */
        const result = yield bcrypt.compare(password, account === null || account === void 0 ? void 0 : account.password);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }
        /* Generate JWT token */
        const token = yield jwt.sign({
            id: account === null || account === void 0 ? void 0 : account._id,
            name: account === null || account === void 0 ? void 0 : account.name,
            role: account === null || account === void 0 ? void 0 : account.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            status: true,
            token: token,
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.login = login;
/* new user registration */
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, role } = req.body;
        /* exist email */
        const emailExist = yield user_service_1.userAuthService.findOneByKey({ email });
        if (emailExist) {
            return res.status(409).json({
                status: false,
                message: "Already exist email"
            });
        }
        /* check exist phone */
        const is_phoneExist = yield user_service_1.userAuthService.findOneByKey({ phone: phone });
        if (is_phoneExist) {
            return res.status(409).json({
                status: true,
                message: "Phone already exist.",
            });
        }
        /* Has password  */
        const hashPassword = yield bcrypt.hash(password, 10);
        const documents = {
            name,
            email,
            phone,
            password: hashPassword,
            role
        };
        yield user_service_1.userAuthService.registration({ documents: Object.assign({}, documents) });
        res.status(201).json({
            status: true,
            message: "User created. "
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.registration = registration;
