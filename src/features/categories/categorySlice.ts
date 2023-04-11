import { apiSlice } from './../api/apiSlice'

export type categoryType = {
  id: number
  name: string
}
export const extendedCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<categoryType[], void>({
      query: () => '/categories',
      providesTags: ['Categories']
    }),
    addNewCategory: builder.mutation({
      query: (category: categoryType) => ({
        url: '/categories',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetCategoriesQuery } = extendedCategoriesApiSlice
