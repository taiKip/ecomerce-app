import { apiSlice } from './../api/apiSlice'

export type orderType = {
  id: number
  userId: string
  createdAt: string
  products: number[]
}
export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<orderType[], void>({
      query: () => '/products.json',
      providesTags: ['Orders']
    })
  })
})

export const { useGetOrdersQuery } = extendedProductsApiSlice
