import { apiSlice } from './../api/apiSlice'

import { IOrder } from '../../interfaces'

export const extendedOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => '/admin/orders',
      providesTags: ['Orders']
    }),
    addNewOrder: builder.mutation({
      query: (order: Partial<IOrder>) => ({
        url: '/orders',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const { useGetOrdersQuery, useAddNewOrderMutation } = extendedOrdersApiSlice
