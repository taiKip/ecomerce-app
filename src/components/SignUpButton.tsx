import { AppRegistrationOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpButton = ({
  handleCloseCart,
  anchorEl
}: {
  handleCloseCart?: () => void
  anchorEl?: boolean
}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (anchorEl && handleCloseCart) {
      handleCloseCart()
    }

    navigate('/auth/register')
  }
  return (
    <Button variant="contained"  onClick={handleClick} endIcon={<AppRegistrationOutlined />}>
      Sign up
    </Button>
  )
}

export default SignUpButton
