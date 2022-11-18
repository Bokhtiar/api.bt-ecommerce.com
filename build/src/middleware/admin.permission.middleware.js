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
exports.isAdmin = void 0;
const jwt = require("jsonwebtoken");
/* Admin validator */
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield req.headers.authorization;
        if (!token)
            return res.status(404).json({
                status: false,
                errors: { message: "Token not found" },
            });
        // decode token
        const splitToken = yield token.split(" ")[1];
        const decode = yield jwt.verify(splitToken, process.env.JWT_SECRET);
        if (decode.role == "admin") {
            const user = {
                id: decode.id,
                name: decode.name,
                role: decode.role,
            };
            req.user = user;
            next();
        }
        else {
            return res.status(410).json({
                status: false,
                errors: { message: "You have no permission to access." },
            });
        }
    }
    catch (error) {
        if (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(410).json({
                    status: false,
                    errors: { message: "Token expired" },
                });
            }
            return res.status(501).json({
                status: false,
                errors: { message: "Unauthorized request" },
            });
        }
    }
});
exports.isAdmin = isAdmin;
