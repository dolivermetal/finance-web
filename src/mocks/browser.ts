import { setupWorker } from 'msw/browser'
import { createAuthHandlers, demoUser } from './handlers'

export const worker = setupWorker(...createAuthHandlers({ currentUser: demoUser }))
