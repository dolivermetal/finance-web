import { Navigate, Outlet, useLocation } from 'react-router'
import { LoadingScreen } from '@/components/layout/loading-screen'
import { useAuth } from './auth-context'

export function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'anonymous') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
