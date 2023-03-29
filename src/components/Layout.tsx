import { Toolbar } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <Container>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Container>
  )
}

export default Layout
