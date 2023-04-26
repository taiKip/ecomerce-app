import { Outlet } from 'react-router-dom'

import { Container } from '@mui/system'
import Header from './Header'
import FooterMenu from './FooterMenu'
import { Toolbar } from '@mui/material'

const Layout = () => {
  return (
    <Container sx={{ minHeight: '100vh' ,padding:{xs:0}}}>
      <Header />
      <Container sx={{padding:{xs:1}}}>
        <Outlet />
      </Container>
      <FooterMenu />
    </Container>
  )
}

export default Layout
