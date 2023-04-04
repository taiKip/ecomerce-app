import { Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Container } from '@mui/system'
import Header from './Header'

const Layout = () => {
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Container>
  )
}

export default Layout
