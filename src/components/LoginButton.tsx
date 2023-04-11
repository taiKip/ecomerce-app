import { Login } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      color="inherit"
      variant="outlined"
      endIcon={<Login />}
      onClick={() => navigate('/auth/login')}>
      Login
    </Button>
  )
}

export default LoginButton
