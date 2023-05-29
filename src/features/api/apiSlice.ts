import { IAuthState } from './../../interfaces'
import { fetchBaseQuery, createApi, BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'
import { FetchBaseQueryArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { logOut, setCredentials } from '../auth/authSlice'
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
      headers.append('Origin', 'Acess-Control-Allow-Origin')
      headers.set('Content-Type', 'application/json')
    }
    return headers
  }
})

const refreshQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { refreshToken } = (getState() as RootState).auth

    if (refreshToken) {
      headers.set('Authorization', `Bearer ${refreshToken}`)
      headers.append('Origin', 'Acess-Control-Allow-Origin')
      headers.set('Content-Type', 'application/json')
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && (result.error.status === 403 || result.error.status === 401)) {
    // try to get a new token
    const refreshResult = await refreshQuery('/auth/refresh', api, extraOptions)
    console.log('REFRESH RESULT:: ', refreshResult)
    if (refreshResult.data) {
      // store the new token
      const newResult = refreshResult.data as IAuthState
      console.log('refreshToken', newResult)
      //retry the initial query
      api.dispatch(setCredentials(newResult))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Users', 'Orders', 'Categories'],
  endpoints: (builder) => ({})
})
