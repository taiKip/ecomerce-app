import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useGetProductsQuery } from './productSlice'

const ProductList = () => {
  const { data } = useGetProductsQuery()

  return (
    <Container>
      {data &&
        data.map((item) => (
          <Typography key={item.id} color="primary">
            {item.title}
          </Typography>
        ))}
    </Container>
  )
}

export default ProductList
