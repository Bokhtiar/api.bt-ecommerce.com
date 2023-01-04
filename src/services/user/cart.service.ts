import { Types } from 'mongoose'
import { Cart } from '../../models/cart.model'
import { ICart } from '../../types/user/cart.types'

/* specific user find cart */
const findAll = async({_id}:{_id: Types.ObjectId}):Promise<ICart[] | []> => {
    return await Cart.find({user:_id, order: null}).populate('product', 'name sale_price image quantity') 
}
 
/* cart store documents */
const addToCart = async ({ product_id, user_id }: { product_id: Types.ObjectId, user_id: Types.ObjectId }): Promise<ICart | null> => {
    /* find one cart already exist */
    const existCart = await Cart.findOne({ user: user_id, product: product_id, order: null })
    if (existCart) {
        let existQty: any;
        existQty = existCart.quantity
        return await Cart.findByIdAndUpdate(existCart._id, { $set: { quantity: existQty + 1 } })
    } else {
        const newCart = new Cart({
            user: user_id,
            product: product_id
        })
        return await newCart.save()
    }
}

export const cartService = {
    findAll,
    addToCart,
}