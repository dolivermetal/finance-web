import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type ComingSoonPageProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function ComingSoonPage({ title, description, icon: Icon }: ComingSoonPageProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Badge variant="secondary">Em breve</Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <p className="font-medium">Estamos preparando esta área</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              A funcionalidade de {title.toLowerCase()} será liberada em uma próxima fase do MVP.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Voltar para visão geral
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
