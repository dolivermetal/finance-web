import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/lib/use-page-title'

export function NotFoundPage() {
  usePageTitle('Página não encontrada')

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Página não encontrada</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        O endereço acessado não existe ou foi movido.
      </p>
      <Button asChild>
        <Link to="/">Voltar ao início</Link>
      </Button>
    </main>
  )
}
