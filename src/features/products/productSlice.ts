import { apiSlice } from './../api/apiSlice'

export interface productType {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
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
