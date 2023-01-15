import { IUser, IUserCreateUpdate } from '../../types/user/user.types'
import { User } from '../../models/user.model'
import { Types } from 'mongoose'

/* find specific resource key */
const findOneByKey = async (document: any): Promise<IUser | null> => {
    return await User.findOne({ ...document })
}

/* new user registration */
const registration = async ({ documents }: { documents: IUserCreateUpdate }): Promise<IUser | null> => {
    const newUser = new User({
        name: documents.name,
        email: documents.email,
        phone: documents.phone,
        password: documents.password,
        role: documents.role
    })
    return await newUser.save()
}

/* user profile */
const profile = async ({ _id }: { _id: Types.ObjectId }):Promise<IUser| null> => {
    return User.findOne({_id})
}

export const userAuthService = {
    findOneByKey,
    registration, 
    profile,
}