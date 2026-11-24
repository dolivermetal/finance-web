import { HttpResponse, http } from 'msw'
import type { LoginCredentials, User } from '@/features/auth/api'

export const demoUser: User = {
  id: '6f0f4f1e-6b0f-4f0f-9f0f-000000000001',
  name: 'Ana Silva',
  email: 'ana@example.com',
}

export const authHandlers = [
  http.get('*/api/v1/auth/me', () =>
    HttpResponse.json({ title: 'Unauthorized', status: 401 }, { status: 401 }),
  ),
  http.post('*/api/v1/auth/login', async ({ request }) => {
    const credentials = (await request.json()) as Partial<LoginCredentials>

    if (credentials.email === demoUser.email && credentials.password === 'secret') {
      return HttpResponse.json(demoUser)
    }

    return HttpResponse.json({ title: 'Unauthorized', status: 401 }, { status: 401 })
  }),
  http.post('*/api/v1/auth/logout', () => new HttpResponse(null, { status: 204 })),
]
