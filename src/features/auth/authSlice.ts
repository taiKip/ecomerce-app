import { IAuthState, IAuthStateDev } from './../../interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialAuthState: IAuthState = {
  user: null,
  token: null,

}
const intialAuthStateDev: IAuthStateDev = {
  access_token:null
}
  
const authSlice = createSlice({
  name: 'auth',
  initialState: intialAuthStateDev,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthStateDev>) => {
     // const { user, token } = action.payload
    //  state.user = user
    //  state.token = token
      const { access_token } = action.payload
      state.access_token =access_token

    },
    logOut: (state, action) => {
      //state.user = null
     // state.token = null
      state.access_token =null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

//export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentUserToken = (state: RootState) => state.auth.access_token
