import { cartItemType } from './features/cart/cartSlice'
import { orderStatusType } from './types'
export interface IReview {
  id: number
  rating: number
  comment: string
}
export interface IProduct {
  id: string
  image: string
  name: string
  price: number
  description: string
  stock: number
  reviews: IReview[]
}
export interface IQuantity {
  quantity: number
}
export interface IOrder {
  id: string
  createdAt: string
  products: cartItemType[]
  customer: string
  status: orderStatusType
  revenue?: string
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
  orders: IOrder[] | []
}
export interface IAuth {
  user: string | null
}
//lower case because of database
export interface IUser {
  firstname: string
  lastname: string
  imageUrl: string
  email: string
  password: string
  role: string
}

export interface IAuthState {
  user: IUser | null
  token: string | null
}
export interface IAuthStateDev {
  access_token: string | null
}
export interface ICategory {
  id: number
  name: string
  image: string
  open: boolean
  description: string
  parentId: number | null
  categories: ICategory[]
}

export interface IProductPage {
  currentPage: number
  hasPreviousPage: boolean
  nextPage: boolean
  products: IProduct[]
  totalItems: number
  totalPages: number
}
