import React from 'react'
import SmallScreenAppBar from '../../components/SmallScreenAppBar'
import UserNotLoggeIn from './UserNotLoggedIn'
import UserLoggedIn from './UserLoggedIn'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const UserProfilePage = () => {
  // const user = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.access_token)

  return token ? (
    <>
      <SmallScreenAppBar />
      <UserLoggedIn />
    </>
  ) : (
    <>
      <SmallScreenAppBar />
      <UserNotLoggeIn />
    </>
  )
}

export default UserProfilePage
