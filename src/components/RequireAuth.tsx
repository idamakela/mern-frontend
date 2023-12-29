import { Navigate, Outlet } from 'react-router-dom'
import auth from '../lib/auth'

const RequireAuth = () => {
  if (auth.isLoggedIn()) {
    return <Outlet />
  } else {
    return <Navigate to='/log-in' replace />
  }
}

export default RequireAuth
