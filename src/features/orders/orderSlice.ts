import { IOrder } from '../../interfaces'
import { apiSlice } from './../api/apiSlice'

export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/products.json',
      providesTags: ['Orders']
    }),
    addNewOrder: builder.mutation({
      query: (order: Partial<IOrder>) => ({
        url: '/orders',
        method: 'POST',
        body: order
      })
    })
  })
})

export const { useGetOrdersQuery, useAddNewOrderMutation } = extendedProductsApiSlice
