import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from './msw/server'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }),
  })

  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  Element.prototype.scrollIntoView = vi.fn()
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  window.localStorage.clear()
  document.documentElement.classList.remove('dark')
})

afterAll(() => {
  server.close()
  vi.unstubAllGlobals()
})
