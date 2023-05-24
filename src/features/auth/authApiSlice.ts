import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
        url: '/auth/login',
        method: 'POST',
        body
      })
    })
  })
})

export const { useRegisterUserMutation, useLoginUserMutation } = extendedAuthenticationSlice
