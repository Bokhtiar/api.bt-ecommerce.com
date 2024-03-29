import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

/* user permission handle */
export const userPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = await req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        status: false,
        message: "Authorization token not found.",
      });
    }

    // decode token
    const splitToken = await token.split(" ")[1];
    const decode = await jwt.verify(splitToken, process.env.JWT_SECRET);
    console.log(decode);
    
    if (decode.role !== "user") {
      return res.status(410).json({
        status: false,
        errors: { message: "You have no permission to access." },
      });
    }

    const user = {
      id: decode.id,
      name: decode.name,
      role: decode.role,
    };
    req.user = user;
    next();
    return;
  } catch (error: any) {
    if (error) {
      res.status(404).json({
        status:true,
        message: "Token expaired."
      })
      // return res.status(error.response.status).json({
      //   status: error.response.data.status,
      //   errors: [...error.response.data.errors],
      // });
    }
  }
};
