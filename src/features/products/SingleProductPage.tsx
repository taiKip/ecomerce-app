import { Link, useNavigate, useParams } from 'react-router-dom'

import { Alert, Button, CardMedia, Container, Typography, Rating, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useTheme } from '@mui/material/styles'
import { Stack } from '@mui/system'
import { useDeleteProductMutation, useGetProductsQuery } from './productApiSlice'
import { ShoppingCartCheckout } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { addToCart } from '../cart/cartSlice'
//import { selectCurrentUser } from '../auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCurrentUserToken } from '../auth/authSlice'
import AddReviewForm from './AddReviewForm'
import useAuth from '../../utils/hooks/useAuth'

const SingleProductPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const token = useAppSelector(selectCurrentUserToken)
  const [openReviewForm, setOpenReviewForm] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const theme = useTheme()
  const { isAdmin, isManager } = useAuth()
  const dispatch = useAppDispatch()
  const [deleteProduct] = useDeleteProductMutation()
  const [deleteError, setDeleteError] = useState(false)
  const { product, error, isLoading } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, error }) => ({
      product: data?.products?.filter((item) => item.id == +productId!),
      error,
      isLoading
    })
  })
  const handleShowPopUp = () => {
    setShowPopUp(true)
  }
  useEffect(() => {
    if (!showPopUp) {
      return
    }
    const timer = setTimeout(() => {
      setShowPopUp((prev) => !prev)
    }, 2000)

    return () => clearTimeout(timer)
  }, [showPopUp])
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
  const handleToggleReview = () => {
    setOpenReviewForm((prev) => !prev)
  }
  return (
    <Container
      component={'section'}
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        maxHeight: '80vh',
        paddingTop: 0,
        marginRight: 0,
        marginLeft: 0
      }}>
      {showPopUp && <Alert> Review added</Alert>}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          placeItems: 'center'
        }}>
        <CardMedia
          component="img"
          image={productObj?.image}
          sx={{ borderRadius: 1, objectFit: 'contain', maxHeight: '50vh', m: 2 }}
        />
        <Typography fontWeight="bold" color="secondary" variant="h5">
          {productObj?.name}
        </Typography>
        <Typography color={theme.palette.mode === 'dark' ? 'primary' : 'inherit'}>
          {productObj?.description}
        </Typography>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          gap={'3px'}
          alignItems={'center'}
          fontSize={'1em'}>
          <Typography color={'green'} component={'p'} fontSize={'inherit'} fontWeight={'bold'}>
            {'€' + productObj?.price}
          </Typography>

          <Button sx={{ gap: '3px' }}>
            <Rating
              name="rating"
              defaultValue={2.5}
              precision={0.5}
              readOnly
              size="small"
              value={productObj?.averageRating || 5}
            />

            <Typography>({productObj?.reviews?.length})</Typography>
          </Button>

          <Button
            variant="text"
            sx={{ color: '#6b6b6b', fontSize: '1em' }}
            onClick={() => setOpenReviewForm((prev) => !prev)}>
            Write Review
          </Button>
          {openReviewForm && (
            <AddReviewForm
              toggleReviewForm={handleToggleReview}
              open={openReviewForm}
              showPopUp={handleShowPopUp}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              productId={+productId!}
            />
          )}
        </Stack>
      </div>
      <Stack display={'flex'} gap={1} width="100%" marginBottom={8}>
        <Button
          variant="outlined"
          color="success"
          endIcon={<ShoppingCartCheckout />}
          onClick={handleAddToCart}>
          Add to cart
        </Button>
        {token &&
          (isAdmin || isManager) && ( //user exists ..todo
            <>
              <Button
                variant="outlined"
                color="warning"
                endIcon={<EditIcon />}
                onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
      </Stack>
    </Container>
  )
}

export default SingleProductPage
