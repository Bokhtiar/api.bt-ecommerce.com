import { Types } from 'mongoose'
import { Cart } from '../../models/cart.model'
import { ICart, ICartCreate } from '../../types/user/cart.types'

/* cart store documents */
const addToCart = async ({ product_id, user_id }: { product_id: Types.ObjectId, user_id: Types.ObjectId }): Promise<ICart | null> => {
    /* check exist product availabe in same user */
    const existCart = await Cart.findOne({user: user_id,product: product_id})
    if(existCart){
        let existQty: any;
        existQty = existCart.quantity
        return await Cart.findByIdAndUpdate(existCart._id, {$set: {quantity :existQty + 1 }})
    }else{
        const newCart = new Cart({
            user : user_id,
            product : product_id
        })
        return await newCart.save()
    }
}

export const cartService = {
    addToCart
}