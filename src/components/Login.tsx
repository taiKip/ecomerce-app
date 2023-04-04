import { GoogleLogin } from 'react-google-login'
import { useAppDispatch } from '../app/hooks'
import { setCredentials } from '../features/auth/authSlice'

import { CLIENT_ID } from '../secrets/apiKey'
import { IUser } from '../interfaces'

const Login = () => {
  const dispatch = useAppDispatch()
  const handleSuccess = (res: any) => {
    const user: IUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl
    }

    dispatch(setCredentials(user))
  }
  const handleFailure = (res: any) => {
    console.log('LOGIN Fail! res: ', res)
  }
  return (
    <div>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login
