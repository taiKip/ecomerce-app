import { IAuthState } from './../../interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialAuthState: IAuthState = {
  user: null,
  token: null,

}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthState>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
      
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentUserToken = (state: RootState) => state.auth.token
