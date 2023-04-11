import React from 'react'
import { Toolbar, Typography, AppBar } from '@mui/material'
const SmallScreenAppBar = ({ title, extraInfo }: { title: string; extraInfo: string }) => {
  return (
    <AppBar sx={{ position: 'fixed', left: 0, right: 0, display: { xs: 'block', sm: 'none' } }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h1" color={'white'} fontSize={'0.8em'} fontWeight={'bold'}>
          {title}
        </Typography>
        <Typography variant="h1" color={'#9575cd'} fontSize={'0.8em'} fontWeight={'bold'}>
          {extraInfo}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default SmallScreenAppBar
