import { Button, CardMedia, Box, TableCell, TableRow, Typography } from '@mui/material'
import { useAppDispatch } from '../../app/hooks'
import { cartItemType, decrementQuantity, incrementQuantity, removeItem } from './cartSlice'

const CartItem = ({ image, quantity, price, title, id }: cartItemType) => {
  const dispatch = useAppDispatch()
  const handleIncrement = () => {
    dispatch(incrementQuantity(id))
  }
  const handleDecrement = () => {
    if (quantity <= 1) {
      dispatch(removeItem(id))
    }
    dispatch(decrementQuantity(id))
  }
  const handleRemove = () => {
    dispatch(removeItem(id))
  }
  const total = price * quantity
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', gap: 1 }} align={'left'}>
        <CardMedia
          component="img"
          sx={{ maxWidth: 100, height: 100, borderRadius: 1 }}
          image={image}
        />

        <Box sx={{ maxWidth: '200px' }}>
          <Typography>{title}</Typography>
          <Button variant="text" color="error" onClick={handleRemove}>
            Remove
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            width: '200px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Button variant="contained" onClick={handleDecrement}>
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button variant="contained" color="secondary" onClick={handleIncrement}>
            +
          </Button>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>€{price.toFixed(2)}</Typography>
      </TableCell>
      <TableCell>€{total.toFixed(2)}</TableCell>
    </TableRow>
  )
}

export default CartItem
