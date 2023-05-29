import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, refreshToken } = (getState() as RootState).auth

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
      headers.append('Origin', 'Acess-Control-Allow-Origin')
      headers.set('Content-Type', 'application/json')
    }
    return headers
  }
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Products', 'Users', 'Orders', 'Categories'],
  endpoints: (builder) => ({})
})
