export interface IProduct {
  id: number
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
  products: number[]
}
