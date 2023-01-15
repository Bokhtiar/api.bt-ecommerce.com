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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreateUpdateValidator = void 0;
const async_validator_1 = __importDefault(require("async-validator"));
const validMongooseID_helper_1 = require("../../helpers/validMongooseID.helper");
/* Resource create & update validaor */
const productCreateUpdateValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const descriptor = {
        category: [
            {
                type: "string",
                required: true,
                message: "Category is required.",
            },
            {
                asyncValidator: (rule, value) => {
                    return new Promise((resolve, reject) => {
                        if (!(0, validMongooseID_helper_1.validMongooseId)(value)) {
                            reject("Category isn't valid mongoose Id.");
                        }
                        else {
                            resolve();
                        }
                    });
                },
            },
        ],
        name: {
            type: "string",
            required: true,
            message: "Name is required.",
        },
        sale_price: {
            type: "string",
            required: true,
            message: "Sale price is required.",
        },
        regular_price: {
            type: "string",
            required: true,
            message: "Regular price is required.",
        },
        image: {
            type: "url",
            require: true,
            message: "Image is required.",
        },
    };
    /* Execute the validator */
    const validator = new async_validator_1.default(descriptor);
    validator.validate(Object.assign({}, req.body), (errors) => {
        if (errors) {
            return res.status(422).json({
                status: false,
                errors,
            });
        }
        next();
    });
});
exports.productCreateUpdateValidator = productCreateUpdateValidator;
