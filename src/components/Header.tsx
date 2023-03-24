import { useContext, useState, MouseEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { AppBar, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Avatar, Badge, Button, CardHeader, IconButton, Menu, MenuItem } from '@mui/material'
import {
  Brightness7Outlined,
  DarkModeOutlined,
  House,
  MailOutline,
  Person2Outlined,
  ShoppingCartCheckoutOutlined,
  TireRepair
} from '@mui/icons-material'

import { Link } from 'react-router-dom'

import { ThemeContext } from '../App'
import profile from '../../public/profile.jpg'
import { useAppSelector } from '../app/hooks'

const navItems = ['users', 'products', 'orders']

const Header = () => {
  const navigate = useNavigate()

  const cartItems = useAppSelector((state) => state.cart.cartItems)

  const colorMode = useContext(ThemeContext)

  const theme = useTheme()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev)
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
          <TireRepair sx={{ mr: 5 }} />
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
        {!isLoggedIn && (
          <Button
            sx={{ ml: 5 }}
            variant="outlined"
            color="secondary"
            endIcon={<Person2Outlined />}
            onClick={handleLogin}>
            login
          </Button>
        )}
        {isLoggedIn && (
          <CardHeader
            sx={{ cursor: 'pointer' }}
            onClick={handleMenu}
            avatar={<Avatar alt="john doe" src={profile} />}
            title="Jane Doe"
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
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
