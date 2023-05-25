/**@todo too much code */
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
  TableContainer,
  Toolbar,
  List,
  ListItem,
  Avatar,
  ListItemText
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
import { useNavigate } from 'react-router-dom'
import UseTheme from '../../utils/hooks/UseTheme'

import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import CartItemsList from './CartItemsList'

const nav = ['PRODUCT DETAILS', 'QUANTITY', 'TOTAL', 'ACTION']
const ShoppingCartPage = () => {
  const { theme } = UseTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [addNewOrder, { isLoading }] = useAddNewOrderMutation()
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)
  const count = cartItems.length

  const totalAmount = cartItems.map((item) => item.quantity * item.price)
  const handleOrder = async () => {
    const id = uuidv4()

    if (count !== 0) {
      const newOrder: IOrder = {
        customer: 'victortarus@gmail.com',
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
        navigate('/')
      }
    }
  }
  return (
    <>
      <SmallScreenAppBar />
      <Container sx={{ paddingTop: 16, overflowX: 'hidden' }}>
        <Box padding={2}>
          <Typography variant="h4" color={'white'} fontSize={'1.4em'} gap={2}>
            <span>Your Shopping Cart </span> <span>🛒</span>
          </Typography>
          <Typography sx={{ color: 'gray' }}>
            {`There is currently ${count} item${count > 1 ? 's' : ''} in the cart`}
          </Typography>
        </Box>
        {/**@todo fix cart  */}
        <Table>
          <TableHead>
            <TableRow>
              {nav.map((item) => (
                <TableCell key={item} align="center">
                  <Typography sx={{ fontSize: { xs: '0.4em' } }}>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <CartItem
                image={item.image}
                quantity={item.quantity}
                price={item.price}
                name={item.name}
                key={item.id}
                description={item.description}
                id={item.id}
                stock={item.stock}
              />
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  )
}
export default ShoppingCartPage
