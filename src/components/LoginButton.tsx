import { Login } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      color="secondary"
      variant="contained"
      endIcon={<Login />}
      onClick={() => navigate('/auth/login')}>
      Login with email
    </Button>
  )
}

export default LoginButton
