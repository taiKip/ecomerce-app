import { Dashboard, Search, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EnhancedIconButton from './EnhancedIconButton'
import { useAppSelector } from '../app/hooks'

const FooterMenu = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  const menuItems = [
    {
      text: 'Home',
      icon: <Dashboard />,
      route: '/'
    },
    {
      text: 'Cart',
      icon: (
        <Badge badgeContent={cartItems.length} color={'secondary'}>
          <ShoppingCartOutlined />
        </Badge>
      ),
      route: '/cart'
    },
    {
      text: 'Search',
      icon: <Search />,
      route: '/search'
    },
    {
      text: 'Profile',
      icon: <AccountCircleIcon />,
      route: '/profile'
    }
  ]
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: 'auto', bottom: 0, display: { xs: 'block', sm: 'none' } }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {menuItems.map((item) => (
          <EnhancedIconButton
            key={item.text}
            route={item.route}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default FooterMenu
