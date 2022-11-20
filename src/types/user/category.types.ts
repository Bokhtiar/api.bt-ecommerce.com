import { Types } from 'mongoose'

export interface ICategory {
    _id: Types.ObjectId
    name: string,
    logo?: string,
    banner_iamge?: string
}