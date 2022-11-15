import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface IDecode {
  name: string;
  role: string;
  exp: number;
}

interface RequestWithUserRole extends Request {
  user?: IDecode;
}

/* Admin validator */
export const isAdmin = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await req.headers.authorization;
    if (!token)
      return res.status(404).json({
        status: false,
        errors: { message: "Token not found" },
      });

    // decode token
    const splitToken = await token.split(" ")[1];
    const decode = await jwt.verify(splitToken, process.env.JWT_SECRET);

    if (decode.role == "admin") {
      req.user = decode;
      next();
    } else {
      return res.status(410).json({
        status: false,
        errors: { message: "You have no permission to access." },
      });
    }
  } catch (error: any) {
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
};
