import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";
import { validMongooseId } from "../../helpers/validMongooseID.helper";

/* Resource create & update validaor */
export const productCreateUpdateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const descriptor = <any>{
    category: [
      {
        type: "string",
        required: true,
        message: "Category is required.",
      },
      {
        asyncValidator: (rule: any, value: string) => {
          return new Promise<void>((resolve, reject) => {
            if (!validMongooseId(value)) {
              reject("Category isn't valid mongoose Id.");
            } else {
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
