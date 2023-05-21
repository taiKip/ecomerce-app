import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../interfaces'
import { RootState } from '../../app/store'
const initialState: Partial<ICategory> = {
  name: 'All',
  description: 'All products'
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<typeof initialState>) => {
      state.name = action.payload.name
      state.description = action.payload.description
    }
  }
})

export const { setCategory } = categorySlice.actions
export const seletCurrentCategory = (state: RootState) => state.category
export default categorySlice.reducer
