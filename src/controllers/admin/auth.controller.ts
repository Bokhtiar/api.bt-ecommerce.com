const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { adminAuthService } from "../../services/admin/auth.service";
import { Request, Response, NextFunction } from "express";
import { IAuthCreateOrUpdate } from "src/types/admin/auth.types";

/**login as a admin */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    /**Check avialable email */
    const account = await adminAuthService.findOneByKey({ email: email });
    if (!account) {
      res.status(404).json({
        status: false,
        message: "Invalid email or password.",
      });
    }

    /* Compare with password */
    const result = await bcrypt.compare(password, account?.password);
    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Invalid email or password.",
      });
    }

    /* Generate JWT token */
    const token = await jwt.sign(
      {
        id: account?._id,
        name: account?.name,
        role: account?.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      status: true,
      data: token,
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/**register as a admin */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password, role } = req.body;

    /**Check exist email */
    const is_emailExist = await adminAuthService.findOneByKey({ email: email });
    if (is_emailExist) {
      res.status(409).json({
        status: false,
        message: "Email already exist.",
      });
    }

    /**Check exist phone */
    const is_phoneExist = await adminAuthService.findOneByKey({ phone: phone });
    if (is_phoneExist) {
      res.status(409).json({
        status: true,
        message: "Phone already exist.",
      });
    }

    /**Has password  */
    const hashPassword = await bcrypt.hash(password, 10);

    const documents: IAuthCreateOrUpdate = {
      name,
      email,
      phone,
      password: hashPassword,
      role,
    };

    await adminAuthService.Registration({data: {...documents}});

    res.status(201).json({
      status: true,
      message: "Admin Created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
