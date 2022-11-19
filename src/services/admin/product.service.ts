import { Types } from 'mongoose'
import { Product } from '../../models/product.model'
import { IProduct, IProductCreateUpdate } from '../../types/admin/product.types'

/* count all */
const countAll = async (): Promise<number> => {
    return await Product.countDocuments()
}

/* find One specific resource */
const findOneById = async (
    { _id }: { _id: Types.ObjectId }): Promise<IProduct | null> => {
    return await Product.findById(_id)
}

/* find all reosurce by paginate */
const findAll = async ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}): Promise<IProduct[] | []> => {
    return await Product.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
};

/* create new resrouce */
const createResource = async ({
    data
}: { data: IProductCreateUpdate }): Promise<IProduct | null> => {
    const newResource = new Product({
        category: data.category,
        name: data.name,
        sale_price: data.sale_price,
        regular_price: data.regular_price,
        image: data.image,
        description: data.description,
        quantity: data.quantity,
        discount: data.discrount
    })

    return await newResource.save();
}

/* find specific resource by id and updated keys */
const findByIdAndUpdate = async ({ _id, data }: { _id: Types.ObjectId, data: IProductCreateUpdate }): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(_id, { $set: { ...data } })
}

/* find sepecific reosurce by id and delete */
const findByIdAndDelete = async ({ _id }: { _id: Types.ObjectId }): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(_id)
}


export const adminProductService = {
    findAll,
    countAll,
    findOneById,
    createResource,
    findByIdAndUpdate,
    findByIdAndDelete,
    
}