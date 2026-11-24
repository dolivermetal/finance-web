import { NavLink } from 'react-router'
import { navigationItems, type NavigationItem } from '@/app/navigation'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type SidebarNavProps = {
  collapsed?: boolean
  label?: string
  onNavigate?: () => void
}

function NavigationLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavigationItem
  collapsed?: boolean
  onNavigate?: () => void
}) {
  const link = (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      aria-label={item.label}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex h-9 items-center gap-3 rounded-lg px-3 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none',
          isActive && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
          collapsed && 'justify-center px-0',
        )
      }
    >
      <item.icon className="size-4 shrink-0" aria-hidden="true" />
      {collapsed ? null : (
        <>
          <span className="truncate">{item.label}</span>
          {item.available ? null : (
            <Badge variant="secondary" className="ml-auto px-1.5 text-[10px]">
              Em breve
            </Badge>
          )}
        </>
      )}
    </NavLink>
  )

  if (!collapsed) {
    return link
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}

export function SidebarNav({
  collapsed = false,
  label = 'Navegação lateral',
  onNavigate,
}: SidebarNavProps) {
  return (
    <nav aria-label={label} className="flex flex-col gap-1 p-3">
      {navigationItems.map((item) => (
        <NavigationLink key={item.to} item={item} collapsed={collapsed} onNavigate={onNavigate} />
      ))}
    </nav>
  )
}
