import { IUser } from './../../interfaces'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IAuthentication {
  user: IUser | null
  token: string | null
}
const initialState: IAuthentication = { user: null, token: null }
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      const user = action.payload
      console.log(user)
      state.user = user
    },
    logOut: (state) => {
      state.user = null
      //state.token = null
    }
  }
})

export const { setCredentials, logOut } = authenticationSlice.actions

export default authenticationSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentUserToken = (state: RootState) => state.auth.token
