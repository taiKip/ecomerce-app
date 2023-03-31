import { GoogleLogout } from 'react-google-login'
import { useAppDispatch } from '../app/hooks'
import { logOut } from '../features/auth/authSlice'
import { CLIENT_ID } from '../secrets/apiKey'

const Logout = () => {
  const dispatch = useAppDispatch()
  const handleSuccess = () => {
    dispatch(logOut())
  }
  return (
    <div>
      <GoogleLogout clientId={CLIENT_ID} buttonText={'Logout'} onLogoutSuccess={handleSuccess} />
    </div>
  )
}

export default Logout
