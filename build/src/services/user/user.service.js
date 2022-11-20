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
exports.userAuthService = void 0;
const user_model_1 = require("../../models/user.model");
/* find specific resource key */
const findOneByKey = (document) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne(Object.assign({}, document));
});
/* new user registration */
const registration = ({ documents }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.User({
        name: documents.name,
        email: documents.email,
        phone: documents.phone,
        password: documents.password,
        role: documents.role
    });
    return yield newUser.save();
});
exports.userAuthService = {
    findOneByKey,
    registration
};
