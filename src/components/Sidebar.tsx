import type { ComponentPropsWithRef, ReactNode } from 'react'

export type SidebarProps = ComponentPropsWithRef<'aside'> & {
  header?: ReactNode
  footer?: ReactNode
  profile?: ReactNode
}

export default function Sidebar({ header, footer, profile, children, className = '', ...props }: SidebarProps) {
  return (
    <aside {...props} className={`flex h-141.5 w-65 max-w-full flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 ${className}`}>
      {header}
      <nav aria-label="Sidebar navigation" className="min-h-0 flex-1 overflow-y-auto">
        {children}
      </nav>
      {footer && <div className="flex shrink-0 flex-col gap-1">{footer}</div>}
      {profile}
    </aside>
  )
}

type SidebarItemOptions = {
  icon?: ReactNode
  active?: boolean
  nested?: boolean
  badge?: ReactNode
}

export type SidebarItemProps = ComponentPropsWithRef<'button'> & SidebarItemOptions & {
  expanded?: boolean
}

function itemClassName({ active, nested }: SidebarItemOptions, className: string) {
  return `flex h-10 w-full shrink-0 items-center gap-2.5 rounded-md p-2 text-left font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-45 ${nested ? 'pl-8 text-sm leading-sm' : 'text-base leading-base'} ${active ? 'bg-blue-50 text-brand-700 dark:bg-blue-950 dark:text-blue-300' : 'text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800'} ${className}`
}

function SidebarItemContent({ icon, active, badge, expanded, children }: SidebarItemOptions & { expanded?: boolean; children?: ReactNode }) {
  return (
    <>
      <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true">{icon}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {badge != null && <span className={`shrink-0 rounded-full px-1.75 py-0.75 text-[10px] font-semibold leading-3 ${active ? 'bg-brand-700 text-white' : 'bg-neutral-50 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'}`}>{badge}</span>}
      {expanded !== undefined && <img src="/sidebar-chevron.svg" alt="" width="14" height="14" className={`shrink-0 dark:invert ${expanded ? 'rotate-90' : ''}`} />}
    </>
  )
}

export function SidebarItem({ icon, active = false, nested = false, badge, expanded, children, className = '', type = 'button', ...props }: SidebarItemProps) {
  return (
    <button
      {...props}
      type={type}
      aria-current={active ? 'page' : undefined}
      aria-expanded={expanded}
      className={itemClassName({ active, nested }, className)}
    >
      <SidebarItemContent icon={icon} active={active} badge={badge} expanded={expanded}>{children}</SidebarItemContent>
    </button>
  )
}

export type SidebarLinkProps = ComponentPropsWithRef<'a'> & SidebarItemOptions

export function SidebarLink({ icon, active = false, nested = false, badge, children, className = '', ...props }: SidebarLinkProps) {
  return (
    <a {...props} aria-current={active ? 'page' : undefined} className={itemClassName({ active, nested }, className)}>
      <SidebarItemContent icon={icon} active={active} badge={badge}>{children}</SidebarItemContent>
    </a>
  )
}

export function SidebarGroup({ className = '', ...props }: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={`flex flex-col gap-1 ${className}`} />
}

export function SidebarGroupLabel({ className = '', ...props }: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={`px-2.5 py-2.5 text-sm font-semibold leading-sm text-neutral-600 dark:text-neutral-300 ${className}`} />
}

export type SidebarHeaderProps = ComponentPropsWithRef<'div'> & {
  logo: ReactNode
}

export function SidebarHeader({ logo, children, className = '', ...props }: SidebarHeaderProps) {
  return (
    <div {...props} className={`flex h-10 shrink-0 items-center gap-2.5 overflow-hidden pr-2.5 ${className}`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-700">{logo}</span>
      <span className="min-w-0 truncate text-3xl font-semibold leading-3xl">{children}</span>
    </div>
  )
}

export type SidebarProfileProps = ComponentPropsWithRef<'div'> & {
  name: string
  initials: string
  action?: ReactNode
}

export function SidebarProfile({ name, initials, action, className = '', ...props }: SidebarProfileProps) {
  return (
    <div {...props} className={`flex h-10 shrink-0 items-center gap-3 rounded-lg px-2 ${className}`}>
      <span className="relative flex size-6 shrink-0 items-center justify-center" aria-hidden="true">
        <img src="/sidebar-avatar.svg" alt="" width="24" height="24" className="absolute inset-0 dark:hidden" />
        <img src="/sidebar-avatar-dark.svg" alt="" width="24" height="24" className="absolute inset-0 hidden dark:block" />
        <span className="absolute inset-0 rounded-full border-2 border-neutral-100 dark:border-neutral-700" />
        <span className="relative text-xs font-bold leading-xs text-brand-800">{initials}</span>
      </span>
      <span className="min-w-0 flex-1 truncate text-xs font-semibold">{name}</span>
      {action}
    </div>
  )
}