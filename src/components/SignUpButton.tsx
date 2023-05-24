import { AppRegistrationOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../features/page/pageTitleSlice'

const SignUpButton = ({
  handleCloseCart,
  anchorEl
}: {
  handleCloseCart?: () => void
  anchorEl?: boolean
}) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleClick = () => {
    if (anchorEl && handleCloseCart) {
      handleCloseCart()
    }
    dispatch(setPageTitle({ name: 'Sign Up', description: 'to view profile' }))
    navigate('/auth/register')
  }
  return (
    <Button variant="contained" onClick={handleClick} endIcon={<AppRegistrationOutlined />}>
      Sign up
    </Button>
  )
}

export default SignUpButton
