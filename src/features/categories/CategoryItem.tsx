import { Button, colors } from '@mui/material'
import React from 'react'
import { categoryType } from './categorySlice'

const CategoryItem = ({ id, name }: categoryType) => {
  return (
    <Button variant="contained" disabled>
      {name}
    </Button>
  )
}

export default CategoryItem
