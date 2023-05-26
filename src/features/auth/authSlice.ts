import { IAuthState } from './../../interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import Cookies from 'universal-cookie'
import useAuth from '../../utils/hooks/useAuth'

const initialAuthState: IAuthState = {
  token: localStorage.getItem('jwt_token')
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthState>) => {
      const { token } = action.payload
      localStorage.setItem('jwt_token', JSON.stringify(token))

      state.token = token
    },
    logOut: (state, action) => {
      state.token = null
      localStorage.removeItem('jwt_token')
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

//export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentUserToken = (state: RootState) => state.auth.token
