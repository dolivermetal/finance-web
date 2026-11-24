import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue, type AuthStatus } from './auth-context'
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  type LoginCredentials,
} from './api'

const AUTH_QUERY_KEY = ['auth', 'me'] as const

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const meQuery = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user)
    },
  })
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== 'auth',
      })
      queryClient.setQueryData(AUTH_QUERY_KEY, null)
    },
  })
  const login = useCallback(
    (credentials: LoginCredentials) => loginMutation.mutateAsync(credentials),
    [loginMutation],
  )
  const logout = useCallback(() => logoutMutation.mutateAsync(), [logoutMutation])
  const status: AuthStatus = meQuery.isPending
    ? 'loading'
    : meQuery.data
      ? 'authenticated'
      : 'anonymous'
  const value = useMemo<AuthContextValue>(
    () => ({
      user: meQuery.data ?? null,
      status,
      login,
      logout,
    }),
    [login, logout, meQuery.data, status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
