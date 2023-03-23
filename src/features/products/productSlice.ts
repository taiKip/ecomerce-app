import { apiSlice } from './../api/apiSlice'

export type productType = {
  id: number
  title: string
  description: string
  category: string
  variant: string
  size: number
}
export const extendedProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<productType[], void>({
      query: () => '/products.json',
      providesTags: ['Products']
    })
  })
})

export const { useGetProductsQuery } = extendedProductsApiSlice
