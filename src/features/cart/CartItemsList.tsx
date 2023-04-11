import { v4 as uuidv4 } from 'uuid'

import {
  Menu,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  CardHeader,
  Button,
  createTheme
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import CartItem from './CartItem'
import SignUp from '../auth/SignUpForm'
import { resetCart } from './cartSlice'
import { useAddNewOrderMutation } from '../orders/orderSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { IOrder } from '../../interfaces'
import SignUpButton from '../../components/SignUpButton'

export type cartPropsType = { anchorEl: null | HTMLElement; handleClose: () => void }
const nav = ['PRODUCT DETAILS', 'QUANTITY', 'PRICE', 'TOTAL']
const CartItemsList = ({ anchorEl, handleClose }: cartPropsType) => {
  const theme = createTheme()
  const dispatch = useAppDispatch()
  //const user = useAppSelector(selectCurrentUser)
  const [addNewOrder, { isLoading }] = useAddNewOrderMutation()
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const count = cartItems.length

  const totalAmount = cartItems.map((item) => item.quantity * item.price)
  const handleOrder = async () => {
    const id = uuidv4()

    if ('tarus' && count !== 0) {
      ///user
      const newOrder: IOrder = {
        customer: 'tarus',
        id: id,
        products: [...cartItems],
        status: 'pending',
        createdAt: new Date().toLocaleDateString(),
        revenue: totalAmount.toString()
      }
      try {
        await addNewOrder(newOrder).unwrap()
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(resetCart())
        handleClose()
      }
    }
  }
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <Container
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          marginBottom: 1
        }}>
        <Box>
          <Typography variant="h4" sx={{ color: 'purple' }}>
            Your Shopping Cart
          </Typography>
          <Typography sx={{ color: 'gray' }}>
            {`There is currently ${count} item${count > 1 ? 's' : ''} in the cart`}
          </Typography>
        </Box>
      </Container>
      <Table>
        <TableHead>
          <TableRow>
            {nav.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <CartItem
              image={item.image}
              quantity={item.quantity}
              price={item.price}
              title={item.title}
              key={item.id}
              category={item.category}
              description={item.description}
              id={item.id}
            />
          ))}
        </TableBody>
      </Table>
      <Container
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: 1,
          marginBottom: 1
        }}>
        <Box display={'flex'} alignItems="center" gap={2}>
          <IconButton onClick={handleClose}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h6">Continue Shopping</Typography>
        </Box>
        {!true && ( //not user
          <>
            <Typography color="ButtonHighlight">Login to checkout</Typography>
            <SignUpButton handleCloseCart={handleClose} anchorEl={Boolean(anchorEl)} />
          </>
        )}
        <>
          {true && ( //not user
            <Button variant="outlined" color="inherit" onClick={handleOrder}>
              Checkout
            </Button>
          )}
        </>
      </Container>
    </Menu>
  )
}

export default CartItemsList
