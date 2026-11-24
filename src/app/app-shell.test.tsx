import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SIDEBAR_STORAGE_KEY } from '@/app/app-layout'
import { AppRoutes } from '@/app/app-routes'
import { AppProviders } from '@/app/providers'
import { demoUser } from '@/mocks/handlers'
import { server } from '@/test/msw/server'

function renderApp(initialPath = '/') {
  server.use(http.get('*/api/v1/auth/me', () => HttpResponse.json(demoUser)))

  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  )
}

describe('App shell', () => {
  it('navigates to a coming soon area from the sidebar', async () => {
    const user = userEvent.setup()
    renderApp()

    await screen.findByRole('heading', { name: 'Visão geral' })
    const sidebar = screen.getByRole('navigation', { name: 'Navegação lateral' })

    await user.click(within(sidebar).getByRole('link', { name: 'Contas' }))

    expect(await screen.findByRole('heading', { name: 'Contas' })).toBeInTheDocument()
    expect(screen.getAllByText('Em breve').length).toBeGreaterThan(0)
  })

  it('collapses the sidebar and persists the preference', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(await screen.findByRole('button', { name: 'Recolher menu' }))

    expect(await screen.findByRole('button', { name: 'Expandir menu' })).toBeInTheDocument()
    expect(window.localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe('true')
  })

  it('opens the more menu on mobile', async () => {
    const user = userEvent.setup()
    renderApp()

    await screen.findByRole('heading', { name: 'Visão geral' })
    await user.click(screen.getByRole('button', { name: 'Abrir mais opções' }))

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: 'Menu' })).toBeInTheDocument()

    await user.click(within(dialog).getByRole('link', { name: 'Relatórios' }))

    expect(await screen.findByRole('heading', { name: 'Relatórios' })).toBeInTheDocument()
  })

  it('toggles the color theme', async () => {
    const user = userEvent.setup()
    renderApp()

    await screen.findByRole('heading', { name: 'Visão geral' })
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))

    await waitFor(() => expect(document.documentElement).toHaveClass('dark'))
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
  })
})
