import { Route, Routes } from 'react-router'
import { AppLayout } from '@/app/app-layout'
import { NotFoundPage } from '@/app/not-found-page'
import { navigationItems } from '@/app/navigation'
import { LoginPage } from '@/features/auth/login-page'
import { ProtectedRoute } from '@/features/auth/protected-route'
import { ComingSoonPage } from '@/features/coming-soon/coming-soon-page'
import { DashboardPage } from '@/features/dashboard/dashboard-page'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />

          {navigationItems
            .filter((item) => !item.available)
            .map((item) => (
              <Route
                key={item.to}
                path={item.to.slice(1)}
                element={
                  <ComingSoonPage
                    title={item.label}
                    description={item.description}
                    icon={item.icon}
                  />
                }
              />
            ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
