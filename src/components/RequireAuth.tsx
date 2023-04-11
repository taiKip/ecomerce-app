import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCurrentUser } from '../features/auth/authSlice'

const RequireAuth = () => {
  const user = true //useAppSelector(selectCurrentUser)

  return user ? <Outlet /> : <Navigate to={'/'} replace />
}

export default RequireAuth
