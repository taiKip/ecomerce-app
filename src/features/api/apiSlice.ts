import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: window.location.origin + '/data/' }),
  tagTypes: ['Products', 'Users', 'Orders'],
  endpoints: (builder) => ({})
})
