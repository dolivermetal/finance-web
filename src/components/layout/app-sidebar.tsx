import { Wallet } from 'lucide-react'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import { APP_NAME } from '@/lib/app-config'
import { cn } from '@/lib/utils'

export function AppSidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        'sticky top-0 hidden h-svh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div
        className={cn(
          'flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4',
          collapsed && 'justify-center px-0',
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Wallet className="size-4" aria-hidden="true" />
        </span>
        {collapsed ? (
          <span className="sr-only">{APP_NAME}</span>
        ) : (
          <span className="truncate text-sm font-semibold tracking-tight">{APP_NAME}</span>
        )}
      </div>

      <SidebarNav collapsed={collapsed} />
    </aside>
  )
}
