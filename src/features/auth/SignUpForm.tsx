import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, FormControlLabel, Stack, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { useAppDispatch } from '../../app/hooks'
import { useRegisterUserMutation } from './authApiSlice'
import { EMAIL_REGEX, PWD_REGEX } from '../../utils/AppConstants'
import { setCredentials } from './authSlice'


const SignUp = () => {
  const navigate = useNavigate()
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)

  const field = {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
  }
  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(email))
  }, [email])
  useEffect(() => {
    setPasswordValid(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setConfirmPasswordValid(PWD_REGEX.test(confirmPassword))
  }, [confirmPassword])

  const canSave = [email, password, userName].every(Boolean) && confirmPassword === password

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (canSave) {
      await registerUser({
        email,
        name: userName,
        password
      })
        .unwrap()
        .then((payload) => {
          dispatch(setCredentials(payload))
        })
        .catch((err) => console.log(err))
    } else {
      return
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
      <SmallScreenAppBar />≈
      <Container sx={{ paddingTop: 8 }}>
        {!canSave && email && confirmPassword && <Alert severity="error">Invalid inputs</Alert>}
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Sign up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            sx={field}
            label="Username"
            color="secondary"
            fullWidth
            required
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            sx={field}
            label="Email"
            color="secondary"
            fullWidth
            required
            error={!emailValid}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={field}
            label="Password"
            color="secondary"
            fullWidth
            required
            error={!passwordValid}
          />
          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={field}
            label="Confirm password"
            color="secondary"
            fullWidth
            required
            error={!confirmPasswordValid}
          />
          <Stack>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}>
              Sign Up
            </Button>
            <Button color="secondary" onClick={() => navigate('/auth/login')}>
              already have an account? Login
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default SignUp
