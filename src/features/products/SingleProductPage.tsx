import { Button, CardMedia, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useTheme } from '@mui/material/styles'
import { Stack } from '@mui/system'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDeleteProductMutation, useGetProductsQuery } from './productSlice'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { useAppDispatch } from '../../app/hooks'
import { useState } from 'react'
import { addToCart } from '../cart/cartSlice'
import { IProduct } from '../../interfaces'

const SingleProductPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [deleteProduct] = useDeleteProductMutation()
  const [deleteError, setDeleteError] = useState(false)
  const { product, error, isLoading } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      product: data?.filter((item) => item.id === Number(productId)),
      error,
      isLoading
    })
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong</div>
  }
  const productObj = product && product[0]
  const handleDelete = async () => {
    try {
      await deleteProduct({ id: productId! }).unwrap()
      navigate('/')
    } catch (error) {
      setDeleteError(true)
    }
  }

  const handleAddToCart = () => {
    if (productObj) {
      dispatch(addToCart({ ...productObj, quantity: 1 }))
    }
  }
  const handleUpdate = () => {
    navigate(`/edit/${productObj?.id}`)
  }
  return (
    <Container
      component={'section'}
      sx={{ gap: 2, display: 'flex', flexDirection: 'column', marginTop: 2, minHeight: '100vh' }}>
      <div
        style={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center'
        }}>
        <CardMedia
          component="img"
          image={productObj?.image}
          sx={{ borderRadius: 1, objectFit: 'contain', maxHeight: '600px', m: 2 }}
        />
        <Typography fontWeight="bold" color="secondary" variant="h5">
          {productObj?.title}
        </Typography>
        <Typography color={theme.palette.mode === 'dark' ? 'primary' : 'inherit'}>
          {productObj?.description}
        </Typography>
      </div>
      <Stack display={'flex'} gap={1} width="100%">
        <Button
          variant="outlined"
          color="success"
          endIcon={<ShoppingCartCheckout />}
          onClick={handleAddToCart}>
          Add to cart
        </Button>
        <Button variant="outlined" color="warning" endIcon={<EditIcon />} onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <p> productId : {productId}</p>
      </Stack>
    </Container>
  )
}

export default SingleProductPage
