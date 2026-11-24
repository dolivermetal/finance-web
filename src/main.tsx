import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser')

    await worker.start({
      onUnhandledFrame: 'warn',
    })
  }
}

async function bootstrap() {
  try {
    await enableMocking()
  } catch (error) {
    console.error('Não foi possível iniciar os mocks da API.', error)
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
