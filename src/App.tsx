import { BrowserRouter } from 'react-router'
import { AppRoutes } from '@/app/app-routes'
import { AppProviders } from '@/app/providers'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
