import { PanelLeftClose, PanelLeftOpen, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { UserMenu } from '@/components/layout/user-menu'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/app-config'
import { usePageTitle } from '@/lib/use-page-title'
import { getPageTitle } from './navigation'

export const SIDEBAR_STORAGE_KEY = 'minhas-financas-sidebar-collapsed'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(
    () => window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true',
  )
  const { pathname } = useLocation()
  const pageTitle = getPageTitle(pathname)

  usePageTitle(pageTitle)

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
  }, [collapsed])

  return (
    <div className="flex min-h-svh bg-muted/30">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-md"
      >
        Pular para o conteúdo
      </a>

      <AppSidebar collapsed={collapsed} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="hidden md:inline-flex"
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? (
              <PanelLeftOpen aria-hidden="true" />
            ) : (
              <PanelLeftClose aria-hidden="true" />
            )}
          </Button>

          <div className="flex items-center gap-2 md:hidden">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{APP_NAME}</span>
          </div>

          <span className="hidden text-sm font-medium md:inline">{pageTitle}</span>

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>

        <main
          id="conteudo"
          tabIndex={-1}
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 focus:outline-none sm:px-6 md:pb-8 lg:px-8"
        >
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
