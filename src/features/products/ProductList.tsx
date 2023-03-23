import React from 'react'
import { useGetProductsQuery } from './productSlice'

const ProductList = () => {
  const { data } = useGetProductsQuery()

  return <div></div>
}

export default ProductList
