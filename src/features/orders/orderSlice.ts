import { IOrder } from '../../interfaces'
import { apiSlice } from './../api/apiSlice'

export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/products.json',
      providesTags: ['Orders']
    }),
    addNewOrder: builder.mutation({
      query: (initialOrder: Partial<IOrder>) => ({
        url: '/orders',
        method: 'POST',
        body: initialOrder
      })
    })
  })
})

export const { useGetOrdersQuery } = extendedProductsApiSlice
