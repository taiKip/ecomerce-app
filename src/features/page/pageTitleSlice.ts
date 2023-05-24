import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPageTitle } from '../../interfaces'
import { RootState } from '../../app/store'
const initialState: IPageTitle = {
  name: 'All',
  description: 'All products'
}
const pageTitleSlice = createSlice({
  name: 'pageTitle',
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<typeof initialState>) => {
      state.name = action.payload.name
      state.description = action.payload.description
    }
  }
})

export const { setPageTitle } = pageTitleSlice.actions
export const seletCurrentCategory = (state: RootState) => state.category
export default pageTitleSlice.reducer
