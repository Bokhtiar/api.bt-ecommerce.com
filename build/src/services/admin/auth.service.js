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
exports.Registration = exports.findOneByKey = void 0;
const models_1 = require("../../models");
/**specific resource findByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.findOne(Object.assign({}, params));
});
exports.findOneByKey = findOneByKey;
/**resource store */
const Registration = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newAdmin = new models_1.Models.Admin({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
    });
    return yield newAdmin.save();
});
exports.Registration = Registration;
