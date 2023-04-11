import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormControlLabel, Stack, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { LoginOutlined } from '@mui/icons-material'
import { useLoginUserMutation } from './authSlice'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [formError, setFormError] = useState(false)

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [loginUser, { data, isSuccess, isError, isLoading }] = useLoginUserMutation()
  const [category, setCategory] = useState('todos')
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
        await loginUser({ email, password }).unwrap()

        setEmail('')

        navigate('/')
      } catch (error) {
        setFormError(true)
      } finally {
        navigate('/')
      }
    }
  }
  return (
    <Container sx={{ marginTop: 8 }}>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Sign up
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

      {/* icons */}
      <br />
      {/* <AcUnitOutlinedIcon color="secondary" fontSize="large"/> */}
    </Container>
  )
}

export default Login
