import { Login } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../features/page/pageTitleSlice'

const LoginButton = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleLogin = () => {
    dispatch(setPageTitle({ name: 'login', description: 'Login in to track your basket' }))
    navigate('/auth/login')
  }
  return (
    <Button color="secondary" variant="contained" endIcon={<Login />} onClick={handleLogin}>
      Login
    </Button>
  )
}

export default LoginButton
