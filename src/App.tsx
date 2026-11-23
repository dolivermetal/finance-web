import { Button } from '@/components/ui/button'

function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Finance Web</h1>
        <p className="text-muted-foreground">Base do frontend pronta. Fase 0 concluída.</p>
      </div>
      <Button type="button">Começar</Button>
    </main>
  )
}

export default App
