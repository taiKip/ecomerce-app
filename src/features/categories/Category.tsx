import { Stack } from '@mui/material'
import React from 'react'
import CategoryItem from './CategoryItem'
import { categoryType } from './categorySlice'

const Category = ({ id, name }: categoryType) => {
  return (
    <Stack
      display="flex"
      flexDirection={'row'}
      gap={1}
      marginTop={2}
      overflow={'scroll'}
      width={'auto'}>
      <CategoryItem name="All" id={1} />
      <CategoryItem name="Vintage" id={1} />
      <CategoryItem name="Classic" id={1} />
      <CategoryItem name="Antique" id={1} />
    </Stack>
  )
}

export default Category
