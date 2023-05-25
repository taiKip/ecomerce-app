import { Button, colors } from '@mui/material'
import React from 'react'
import { ICategory } from '../../interfaces'
import { Link, NavLink } from 'react-router-dom'

const CategoryItem = ({ category, disabled }: { category: ICategory; disabled: boolean }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Button variant="contained" disabled={disabled} size="small">
        {category.name}
      </Button>
    </Link>
  )
}

export default CategoryItem
