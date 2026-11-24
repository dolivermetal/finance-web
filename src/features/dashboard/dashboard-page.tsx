import { useAuth } from '@/features/auth/auth-context'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Bem-vindo, {user?.name}.</p>
      <p className="text-sm text-muted-foreground">Seu resumo financeiro aparecerá aqui.</p>
    </section>
  )
}
