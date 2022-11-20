import { IUser, IUserCreateUpdate } from '../../types/user/user.types'
import { User } from '../../models/user.model'

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


export const userAuthService = {
    findOneByKey,
    registration
}