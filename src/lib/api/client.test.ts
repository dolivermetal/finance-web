import { HttpResponse, http } from 'msw'
import { afterEach, describe, expect, it } from 'vitest'
import { server } from '@/test/msw/server'
import { apiRequest } from './client'

afterEach(() => {
  document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/'
})

describe('apiRequest', () => {
  it('sends JSON and the CSRF header for unsafe methods', async () => {
    document.cookie = 'XSRF-TOKEN=csrf-token; path=/'

    let receivedHeaders: Headers | undefined
    let receivedBody: unknown

    server.use(
      http.post('*/api/v1/test', async ({ request }) => {
        receivedHeaders = request.headers
        receivedBody = await request.json()

        return HttpResponse.json({ ok: true })
      }),
    )

    await expect(
      apiRequest('/test', {
        method: 'POST',
        body: JSON.stringify({ name: 'example' }),
      }),
    ).resolves.toEqual({ ok: true })

    expect(receivedHeaders?.get('x-xsrf-token')).toBe('csrf-token')
    expect(receivedHeaders?.get('content-type')).toContain('application/json')
    expect(receivedBody).toEqual({ name: 'example' })
  })

  it('does not send the CSRF header for safe methods', async () => {
    document.cookie = 'XSRF-TOKEN=csrf-token; path=/'

    let receivedHeaders: Headers | undefined

    server.use(
      http.get('*/api/v1/test', ({ request }) => {
        receivedHeaders = request.headers

        return HttpResponse.json({ ok: true })
      }),
    )

    await apiRequest('/test')

    expect(receivedHeaders?.get('x-xsrf-token')).toBeNull()
  })

  it('maps Problem Details responses to ApiError', async () => {
    server.use(
      http.get('*/api/v1/test', () =>
        HttpResponse.json(
          {
            title: 'Validation failed',
            status: 422,
            detail: 'Dados inválidos',
          },
          {
            status: 422,
            headers: { 'Content-Type': 'application/problem+json' },
          },
        ),
      ),
    )

    await expect(apiRequest('/test')).rejects.toMatchObject({
      name: 'ApiError',
      status: 422,
      message: 'Dados inválidos',
    })
  })
})
