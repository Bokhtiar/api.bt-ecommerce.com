import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { IUserCreateUpdate } from 'src/types/user/user.types'
import { cartService } from '../../services/user/cart.service'
import { ICartCreate } from '../../types/user/cart.types'

/* store documents */
export const store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params //product id
        const userID = req.user.id
        console.log("user",userID);
        
        const result = await cartService.addToCart({user_id: new Types.ObjectId(userID), product_id: new Types.ObjectId(id)})

        res.status(201).json({
            status:true,
            data:result,
            message: "Cart added"
        })
    } catch (error: any) {
        console.log(error);
        next(error)
    }
}