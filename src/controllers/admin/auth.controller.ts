import { Request, Response, NextFunction } from "express";

/**login as a admin */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const { name, email, phone, password } = req.body;
    const documents = {
      name,
      email,
      phone,
      password,
    };

    res.status(201).json({
      status: true,
      data: documents,
      message: "Admin Created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
