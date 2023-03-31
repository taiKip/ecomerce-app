import { orderStatusType } from './types'

export interface IProduct {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
}
export interface IQuantity {
  quantity: number
}
export interface IOrder {
  id: string
  createdAt: string
  products: string[]
  customer: string
  status: orderStatusType
  revenue: string
}

export interface ISelectProps {
  id: string
  content: string
}
export interface ISortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}
export interface ITableProps {
  title: string
  subheader: string
  headerCells: string[]
}
export interface IAuth {
  user: string | null
  token: string | null
}

export interface IUser {
  firstName: string
  lastName: string
  imageUrl: string
  email: string
}
