import { IconButton, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const EnhancedIconButton = ({
  route,
  text,
  icon
}: {
  route: string
  text: string
  icon: ReactNode
}) => {
  const navigate = useNavigate()
  return (
    <IconButton
      onClick={() => navigate(route)}
      color="inherit"
      aria-label={text}
      sx={{ display: 'flex', flexDirection: 'column' }}>
      {icon}
      <Typography variant="h6" fontSize={'0.4em'}>
        {text}
      </Typography>
    </IconButton>
  )
}

export default EnhancedIconButton
