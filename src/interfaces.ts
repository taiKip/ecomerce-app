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
  id: number
  userId: string
  createdAt: string
  products: string[]
}

export interface ISelectProps {
  id: string
  content: string
}
export interface ISortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}
