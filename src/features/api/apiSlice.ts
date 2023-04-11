import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/' }),
  tagTypes: ['Products', 'Users', 'Orders', 'Categories'],
  endpoints: (builder) => ({})
})
