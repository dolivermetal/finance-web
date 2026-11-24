import {
  ChartColumn,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { navigationItems } from '@/app/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/utils'

type SummaryCardProps = {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  tone?: 'default' | 'positive' | 'negative'
}

function SummaryCard({ label, value, hint, icon: Icon, tone = 'default' }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground',
              tone === 'positive' && 'bg-success/10 text-success',
              tone === 'negative' && 'bg-destructive/10 text-destructive',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const upcomingItems = navigationItems.filter((item) =>
    ['/contas', '/transacoes', '/relatorios'].includes(item.to),
  )

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Visão geral</h1>
        <p className="text-muted-foreground">Bem-vindo, {user?.name}.</p>
        <p className="text-sm text-muted-foreground">
          Acompanhe sua vida financeira em um só lugar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Saldo total"
          value="—"
          hint="Cadastre contas para calcular"
          icon={Wallet}
        />
        <SummaryCard
          label="Receitas do mês"
          value="—"
          hint="Sem receitas registradas"
          icon={TrendingUp}
          tone="positive"
        />
        <SummaryCard
          label="Despesas do mês"
          value="—"
          hint="Sem despesas registradas"
          icon={TrendingDown}
          tone="negative"
        />
        <SummaryCard
          label="Faturas abertas"
          value="—"
          hint="Nenhuma fatura em aberto"
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-heading text-base leading-snug font-medium">Resumo do mês</h2>
            <p className="text-sm text-muted-foreground">
              Receitas, despesas e saldo aparecerão aqui.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-52 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center">
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ChartColumn className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="font-medium">Ainda não há dados</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Cadastre contas e transações para acompanhar sua evolução.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/contas">Explorar contas</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-heading text-base leading-snug font-medium">Próximas etapas</h2>
            <p className="text-sm text-muted-foreground">Recursos em preparação.</p>
          </CardHeader>
          <CardContent className="space-y-1">
            {upcomingItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="-mx-2 flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <item.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <Badge variant="secondary" className="shrink-0 px-1.5 text-[10px]">
                  Em breve
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
