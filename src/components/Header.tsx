import { useContext, useState, MouseEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { GoogleLogout } from 'react-google-login'
import { CLIENT_ID } from '../secrets/apiKey'
import { useTheme } from '@mui/material/styles'
import { AppBar, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Avatar, Badge, Button, CardHeader, IconButton, Menu, MenuItem } from '@mui/material'
import {
  Brightness7Outlined,
  DarkModeOutlined,
  Dashboard,
  MailOutline,
  ShoppingCartCheckoutOutlined
} from '@mui/icons-material'
import { ThemeContext } from '../App'
import { useAppSelector } from '../app/hooks'
import CartItemsList from '../features/cart/CartItemsList'
import Login from './Login'
import { selectCurrentUser } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const colorMode = useContext(ThemeContext)
  const theme = useTheme()

  const user = useAppSelector(selectCurrentUser)
  let navItems: string[] = []
  if (user) {
    navItems = ['users', 'dashboard', 'categories']
  }
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null)

  useEffect(() => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user])
  const handleCloseCart = () => {
    setCartAnchorEl(null)
  }

  const handleCart = (event: MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget)
  }

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setIsLoggedIn((prev) => !prev)
    setAnchorEl(null)
    navigate('/')
  }
  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Link to={'/'}>
          <Dashboard sx={{ mr: 5 }} />
        </Link>
        <Box sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}>
          {navItems.map((item) => (
            <Link to={item} key={item}>
              <Button color="inherit">{item}</Button>
            </Link>
          ))}
        </Box>
        <Box>
          <IconButton
            size="medium"
            aria-label="show all 2 new notifications"
            color="inherit"
            sx={{ borderRadius: 1 }}>
            <Badge badgeContent={2} color="success">
              <MailOutline />
            </Badge>
          </IconButton>
          <IconButton
            size="medium"
            aria-label="notifications"
            color="inherit"
            onClick={handleCart}
            sx={{
              borderRadius: 1
            }}>
            <Badge badgeContent={cartItems.length} color={'secondary'}>
              <ShoppingCartCheckoutOutlined />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'light' ? <DarkModeOutlined /> : <Brightness7Outlined />}
          </IconButton>
        </Box>
        {!isLoggedIn && <Login />}
        {isLoggedIn && (
          <CardHeader
            sx={{ cursor: 'pointer' }}
            onClick={handleMenu}
            avatar={<Avatar alt={user?.firstName.charAt(0)} src={user?.imageUrl} />}
            title={`${user?.firstName + ' ' + user?.lastName}`}
            subheader="Admin"
          />
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText={'Logout'}
              onLogoutSuccess={handleLogout}
            />
          </MenuItem>
        </Menu>
        <CartItemsList anchorEl={cartAnchorEl} handleClose={handleCloseCart} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
