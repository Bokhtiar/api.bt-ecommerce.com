import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";

/* Resource create validaor */
export const loginValidators = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const descriptor = <any>{
        user: {
            type: "string",
            required: true,
            message: "User is required.",
        },
        product: {
            type: "string",
            required: true,
            message: "Product is required.",
        },
    };

    /* Execute the validator */
    const validator = new Schema(descriptor);

    validator.validate({ ...req.body }, (errors: any) => {
        if (errors) {
            return res.status(422).json({
                status: false,
                errors,
            });
        }
        next();
    });
};
