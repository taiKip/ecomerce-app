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

const nav = ['PRODUCT DETAILS', 'QUANTITY', 'PRICE', 'TOTAL']
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
      <SmallScreenAppBar title={'Cart'} extraInfo="a basket full of goodness" />
      <Container sx={{ paddingTop: 16 }}>
        <Box>
          <Typography variant="h4" sx={{ color: 'purple' }} fontSize={'1.4em'}>
            Your Shopping Cart
          </Typography>
          <Typography sx={{ color: 'gray' }}>
            {`There is currently ${count} item${count > 1 ? 's' : ''} in the cart`}
          </Typography>
        </Box>
        {/**@todo fix cart  */}
        <List sx={{ width: '100%',color:"purple",bgcolor:"background.paper"}}>
          {cartItems.map((item) => (
            <ListItem key={item.id}  >
              <ListItemText>{item.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  )
}
export default ShoppingCartPage
