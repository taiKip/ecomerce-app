import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logOut, setCredentials } from './authSlice'
import { RootState } from '../../app/store'

import { IUser } from '../../interfaces'
import { apiSlice } from '../api/apiSlice'

export const extendedAuthenticationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: Partial<IUser>) => ({
        url: '/auth/register',
        method: 'POST',
        body
      })
    }),
    loginUser: builder.mutation({
      query: (body: Partial<IUser>) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body
      })
    }),
    LogOutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      })
    })
  })
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useRefreshMutation
} = extendedAuthenticationSlice
