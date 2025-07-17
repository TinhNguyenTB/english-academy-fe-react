import { PATHS } from '@/constants/paths'
import Home from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import UserPage from '@/pages/User'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <Home />
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />
  },
  {
    path: '/users',
    element: <UserPage />
  }
])
