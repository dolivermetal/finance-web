import { Menu } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
  isNavigationItemActive,
  mobilePrimaryItems,
  secondaryNavigationItems,
} from '@/app/navigation'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const itemClassName =
  'flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:outline-none'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isMoreActive = secondaryNavigationItems.some((item) =>
    isNavigationItemActive(item, pathname),
  )

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="grid grid-cols-4">
        {mobilePrimaryItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => cn(itemClassName, isActive && 'text-foreground')}
          >
            <item.icon className="size-5" aria-hidden="true" />
            <span>{item.shortLabel ?? item.label}</span>
          </NavLink>
        ))}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={cn(itemClassName, isMoreActive && 'text-foreground')}
              aria-label="Abrir mais opções"
              aria-current={isMoreActive ? 'page' : undefined}
            >
              <Menu className="size-5" aria-hidden="true" />
              <span>Mais</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85svh]">
            <SheetHeader className="pr-10">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Acesse todas as áreas do aplicativo.</SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto pb-6">
              <SidebarNav
                label="Todas as áreas"
                onNavigate={() => {
                  setOpen(false)
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
