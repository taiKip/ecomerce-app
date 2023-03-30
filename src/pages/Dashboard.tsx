import { Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Container>
      <Link to="/create">
        <Button variant="contained" color="primary">
          Add New product
        </Button>
      </Link>
    </Container>
  )
}

export default Dashboard
