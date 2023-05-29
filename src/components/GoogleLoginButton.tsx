import { Button } from '@mui/material'
import GoogleIcon from '../assets/google.svg'
import React from 'react'

const GoogleLoginButton = () => {
  return (
    <Button variant="contained" sx={{ display: 'flex', gap: 1 }} color="info">
      <img src={GoogleIcon} height="16px" />
      Continue with google
    </Button>
  )
}

export default GoogleLoginButton
