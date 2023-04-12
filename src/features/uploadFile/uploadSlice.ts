import { apiSlice } from '../api/apiSlice'

export const extendFileUploadSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<string, FormData>({
      query: (data) => ({
        url: '/file',
        method: 'POST',
        credentials: 'include',
        body: data
      })
    })
  })
})

export const { useUploadImageMutation } = extendFileUploadSlice