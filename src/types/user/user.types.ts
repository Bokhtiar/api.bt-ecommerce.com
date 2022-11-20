import { Types } from 'mongoose'

export interface IUser {
    _id: Types.ObjectId,
    name: string,
    email: string,
    phone: number,
    password: string,
    role: string
}

export interface IUserCreateUpdate {
    name: string,
    email: string,
    phone: number,
    password: string,
    role: string
}