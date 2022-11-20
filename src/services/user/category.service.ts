import { Types } from 'mongoose';
import { Category } from '../../models/category.model'
import { ICategory } from '../../types/user/category.types'

/* find all category */
const findAll = async (): Promise<ICategory[] | []> => {
    return await Category.find({}, { createdAt: 0, updatedAt: 0, banner_image: 0 });
}

/* find specific category */
const findOneById = async ({ _id }: { _id: Types.ObjectId }): Promise<ICategory | null> => {
    return await Category.findById(_id)
}

export const userCategoryService = {
    findAll,
    findOneById
}