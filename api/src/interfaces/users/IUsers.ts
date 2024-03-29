import { Types } from 'mongoose'

export interface ICreateUser {
  name: string
  email: string
  phone: string
  password?: string
  image?: string
  token?: string
  _doc?: any
  _id?: Types.ObjectId
}

export interface IUpdateUser {
  _id: Types.ObjectId
  name: string
  phone: string
  password?: string
  image?: string
  currentpassword?: string
  newpassword?: string
}

export interface ILoginUser {
  email: string
  password: string
}

export interface IPaginateParams {
  page: number
  skip: number
  take: number
}

export interface IUsersPaginateProperties {
  per_page: number
  total: number
  current_page: number
  data: ICreateUser[]
}
