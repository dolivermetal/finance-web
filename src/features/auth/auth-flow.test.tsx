import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/app-routes'
import { AppProviders } from '@/app/providers'
import { demoUser } from '@/test/msw/handlers'
import { server } from '@/test/msw/server'

function renderApp(initialPath = '/login') {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('Auth flow', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(await screen.findByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })

  it('shows a generic error for invalid credentials', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(await screen.findByLabelText('E-mail'), 'ana@example.com')
    await user.type(screen.getByLabelText('Senha'), 'wrong-password')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('E-mail ou senha inválidos.')).toBeInTheDocument()
  })

  it('sends credentials in the JSON body and redirects after login', async () => {
    const user = userEvent.setup()
    let capturedRequest: { url: string; body: unknown } | undefined

    server.use(
      http.post('*/api/v1/auth/login', async ({ request }) => {
        capturedRequest = {
          url: request.url,
          body: await request.json(),
        }

        return HttpResponse.json(demoUser)
      }),
    )

    renderApp()

    await user.type(await screen.findByLabelText('E-mail'), demoUser.email)
    await user.type(screen.getByLabelText('Senha'), 'secret')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(capturedRequest?.body).toEqual({
      email: demoUser.email,
      password: 'secret',
    })
    expect(capturedRequest?.url).not.toContain('password')
  })

  it('restores an existing session on a protected route', async () => {
    server.use(http.get('*/api/v1/auth/me', () => HttpResponse.json(demoUser)))

    renderApp('/')

    expect(await screen.findByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText(`Bem-vindo, ${demoUser.name}.`)).toBeInTheDocument()
  })

  it('logs out and returns to the login page', async () => {
    const user = userEvent.setup()
    server.use(http.get('*/api/v1/auth/me', () => HttpResponse.json(demoUser)))

    renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Sair' }))

    expect(await screen.findByRole('heading', { name: 'Entrar' })).toBeInTheDocument()
  })
})
