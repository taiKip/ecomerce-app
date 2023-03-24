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
  Box
} from '@mui/material'
import { ArrowBack, Category, Close } from '@mui/icons-material'
import { useAppSelector } from '../../app/hooks'
import CartItem from './CartItem'
import { color } from '@mui/system'

export type cartPropsType = { anchorEl: null | HTMLElement; handleClose: () => void }
const nav = ['PRODUCT DETAILS', 'QUANTITY', 'PRICE', 'TOTAL']
const CartItemsList = ({ anchorEl, handleClose }: cartPropsType) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems)

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
        <Typography fontWeight="bold" variant="h5">
          My Shopping cart
        </Typography>
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
      </Container>
    </Menu>
  )
}

export default CartItemsList
