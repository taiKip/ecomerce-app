import { useEffect } from 'react'
import { useAppDispatch } from '../../app/store'
import { extendedUsersApiSlice } from './userSlice'

const UsersList = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(extendedUsersApiSlice.endpoints.getUsers.initiate())
  }, [])

  return <div>UsersList</div>
}

export default UsersList