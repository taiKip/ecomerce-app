import { apiSlice } from './../api/apiSlice'

export type categoryType = {
  id: number
  name: string
}
export const extendedCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<categoryType[], void>({
      query: () => '/categories',
      providesTags: ['Category']
    })
  })
})

export const { useGetCategoriesQuery } = extendedCategoriesApiSlice
