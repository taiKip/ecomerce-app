import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormControlLabel, Stack, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')

  const [nameError, setNameError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const [category, setCategory] = useState('todos')
  const field = {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setNameError(false)
    setDetailsError(false)
    if (name === '') {
      setNameError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }
    if (name && details) {
      //
    }
  }
  return (
    <>
      <SmallScreenAppBar title="Sign Up" extraInfo="almost there" />
      <Container sx={{ paddingTop: 16}}>
        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
          Sign up
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setName(e.target.value)}
            sx={field}
            label="User Name"
            color="secondary"
            fullWidth
            required
            error={nameError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            sx={field}
            label="Password"
            color="secondary"
            fullWidth
            required
            error={detailsError}
          />
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            sx={field}
            label="Confirm password"
            color="secondary"
            fullWidth
            required
            error={detailsError}
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
