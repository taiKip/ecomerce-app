import { Outlet } from 'react-router-dom'

import { Container } from '@mui/system'
import Header from './Header'
import FooterMenu from './FooterMenu'
import { Toolbar } from '@mui/material'

const Layout = () => {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Header />
      <Toolbar />
      <Container>
        <Outlet />
      </Container>
      <FooterMenu />
    </Container>
  )
}

export default Layout
