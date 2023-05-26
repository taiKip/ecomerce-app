import { apiSlice } from './../api/apiSlice'

import { IOrder } from '../../interfaces'

export const extendedOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/orders',
      providesTags: ['Orders']
    }),
    placeOrder: builder.mutation({
      query: (order: IOrder) => ({
        url: '/orders',
        method: 'POST',
        body: { ...order }
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const { useGetOrdersQuery, usePlaceOrderMutation } = extendedOrdersApiSlice
