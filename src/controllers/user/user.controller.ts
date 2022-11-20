const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express'
import { userAuthService } from '../../services/user/user.service'
import { IUser, IUserCreateUpdate } from '../../types/user/user.types'

/* login as a user */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        /* check account is exists  */
        const account = await userAuthService.findOneByKey({ email });
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        /* compare with password */
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

/* new user registration */
export const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, password, role } = req.body

        /* exist email */
        const emailExist = await userAuthService.findOneByKey({ email })
        if (emailExist) {
            return res.status(409).json({
                status: false,
                message: "Already exist email"
            })
        }

        /* check exist phone */
        const is_phoneExist = await userAuthService.findOneByKey({ phone: phone });
        if (is_phoneExist) {
            return res.status(409).json({
                status: true,
                message: "Phone already exist.",
            });
        }

        /* Has password  */
        const hashPassword = await bcrypt.hash(password, 10);

        const documents: IUserCreateUpdate = {
            name,
            email,
            phone,
            password: hashPassword,
            role
        }

        await userAuthService.registration({ documents: { ...documents } })

        res.status(201).json({
            status: true,
            message: "User created. "
        })

    } catch (error: any) {
        console.log(error)
        next(error)
    }
}