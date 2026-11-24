import {
  ArrowLeftRight,
  ChartColumn,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  Tags,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export type NavigationItem = {
  label: string
  shortLabel?: string
  to: string
  icon: LucideIcon
  description: string
  available: boolean
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Visão geral',
    shortLabel: 'Início',
    to: '/',
    icon: LayoutDashboard,
    description: 'Resumo das suas finanças.',
    available: true,
  },
  {
    label: 'Transações',
    to: '/transacoes',
    icon: ArrowLeftRight,
    description: 'Registre entradas, saídas e transferências.',
    available: false,
  },
  {
    label: 'Contas',
    to: '/contas',
    icon: Wallet,
    description: 'Organize contas bancárias e cartões.',
    available: false,
  },
  {
    label: 'Categorias',
    to: '/categorias',
    icon: Tags,
    description: 'Classifique suas receitas e despesas.',
    available: false,
  },
  {
    label: 'Grupos',
    to: '/grupos',
    icon: FolderTree,
    description: 'Agrupe categorias por contexto.',
    available: false,
  },
  {
    label: 'Faturas',
    to: '/faturas',
    icon: CreditCard,
    description: 'Acompanhe as faturas dos cartões.',
    available: false,
  },
  {
    label: 'Relatórios',
    to: '/relatorios',
    icon: ChartColumn,
    description: 'Analise sua evolução financeira.',
    available: false,
  },
]

export const mobilePrimaryItems = navigationItems.filter((item) =>
  ['/', '/transacoes', '/contas'].includes(item.to),
)

export const secondaryNavigationItems = navigationItems.filter(
  (item) => !mobilePrimaryItems.includes(item),
)

export function isNavigationItemActive(item: NavigationItem, pathname: string) {
  if (item.to === '/') {
    return pathname === '/'
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`)
}

export function getNavigationItem(pathname: string) {
  return navigationItems.find((item) => isNavigationItemActive(item, pathname))
}

export function getPageTitle(pathname: string) {
  return getNavigationItem(pathname)?.label ?? 'Página não encontrada'
}
