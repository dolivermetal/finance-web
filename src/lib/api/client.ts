import { ApiError, type ProblemDetails } from './problem'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '/api/v1').replace(/\/+$/, '')
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])
const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return new URL(`${API_BASE_URL}${normalizedPath}`, window.location.origin).toString()
}

function getCookie(name: string): string | null {
  const prefix = `${name}=`
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(prefix))

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) {
    return undefined
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (
    contentType.includes('application/json') ||
    contentType.includes('application/problem+json')
  ) {
    try {
      return await response.json()
    } catch {
      return undefined
    }
  }

  const text = await response.text()

  return text.length > 0 ? text : undefined
}

function toProblemDetails(body: unknown): ProblemDetails | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined
  }

  return body as ProblemDetails
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? 'GET').toUpperCase()
  const headers = new Headers(init.headers)

  headers.set('Accept', 'application/json')

  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (!SAFE_METHODS.has(method)) {
    const csrfToken = getCookie(CSRF_COOKIE)

    if (csrfToken) {
      headers.set(CSRF_HEADER, csrfToken)
    }
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    method,
    headers,
    credentials: 'include',
  })
  const body = await readResponseBody(response)

  if (!response.ok) {
    throw new ApiError(response.status, toProblemDetails(body))
  }

  return body as T
}
