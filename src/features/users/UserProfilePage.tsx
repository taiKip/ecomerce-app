import React from 'react'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import { Container } from '@mui/material'
import UserNotLoggeIn from './UserNotLoggedIn'
import UserLoggedIn from './UserLoggedIn'
import { useAppSelector } from '../../app/hooks'

const UserProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user)
  return user ? (
    <>
      <SmallScreenAppBar title="Profile" extraInfo="my details" />
      <UserLoggedIn />
    </>
  ) : (
    <>
      <SmallScreenAppBar title="Login/Sign up" extraInfo="to view  profile" />
      <UserNotLoggeIn />
    </>
  )
}

export default UserProfilePage
