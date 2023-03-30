import { Toolbar } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
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
