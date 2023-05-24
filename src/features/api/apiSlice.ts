import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token

      if (token) {
        headers.set('Authorization', token)
        headers.append('Origin', 'Acess-Control-Allow-Origin')
      }
      return headers
    }
  }),
  tagTypes: ['Products', 'Users', 'Orders', 'Categories'],
  endpoints: (builder) => ({})
})
