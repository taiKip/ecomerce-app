import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, FormControlLabel, Snackbar, Stack, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { LoginOutlined } from '@mui/icons-material'
import { useLoginUserMutation } from './authApiSlice'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { useAppDispatch } from '../../app/hooks'
import { setCredentials } from './authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [formError, setFormError] = useState(false)

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [loginUser, { data, isSuccess, isError, isLoading }] = useLoginUserMutation()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess && data) {
        dispatch(setCredentials(data))
        navigate('/', { replace: true })
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [isSuccess,data])

  const field = {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEmailError(false)
    setPasswordError(false)
    if (email === '') {
      setEmailError(true)
    }
    if (password === '') {
      setPasswordError(true)
    }

    if (email && password) {
      try {
        const res = await loginUser({ email, password }).unwrap()
        console.log(res)
        dispatch(setCredentials(res))
        setEmail('')
      } catch (error) {
        setFormError(true)
      }
    }
  }
  return (
    <>
      <Snackbar
        open={isSuccess}
        autoHideDuration={1000}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Login successfull
        </Alert>
      </Snackbar>
      <SmallScreenAppBar title="Login " extraInfo="welcome" />
      <Container sx={{ paddingTop: 16 }}>
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            sx={field}
            label="email"
            color="secondary"
            fullWidth
            required
            error={emailError}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={field}
            label="Password"
            color="secondary"
            fullWidth
            required
            error={passwordError}
          />
          <Stack>
            <Button type="submit" color="secondary" variant="contained" endIcon={<LoginOutlined />}>
              Log In
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default Login
