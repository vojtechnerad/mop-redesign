import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type BadgeTone = 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info'
export type BadgeSize = 'small' | 'default' | 'large'

export type BadgeProps = Omit<ComponentPropsWithRef<'span'>, 'size'> & {
  tone?: BadgeTone
  size?: BadgeSize
  icon?: ReactNode
  dot?: boolean
  onDismiss?: () => void
  dismissLabel?: string
  theme?: 'light' | 'dark'
}

export default function Badge({
  tone = 'default',
  size = 'default',
  icon,
  dot = false,
  onDismiss,
  dismissLabel = 'Dismiss badge',
  theme: themeOverride,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const sizes: Record<BadgeSize, string> = {
    small: 'h-5',
    default: 'h-6',
    large: 'h-7',
  }
  const colors: Record<BadgeTone, string> = {
    default: theme === 'dark' ? 'border border-neutral-1000 bg-neutral-50 text-neutral-900' : 'border border-neutral-1000 bg-neutral-950 text-neutral-50',
    secondary: theme === 'dark' ? 'bg-neutral-800 text-neutral-50' : 'bg-neutral-50 text-neutral-900',
    outline: theme === 'dark' ? 'border border-[#d4d4d4] bg-transparent text-neutral-50' : 'border border-[#d4d4d4] bg-transparent text-neutral-900',
    destructive: theme === 'dark' ? 'bg-red-950/70 text-red-700' : 'bg-red-50 text-red-700',
    success: theme === 'dark' ? 'bg-green-950/40 text-green-700' : 'bg-green-100 text-green-700',
    warning: theme === 'dark' ? 'bg-yellow-950/40 text-yellow-700' : 'bg-yellow-100 text-yellow-700',
    info: theme === 'dark' ? 'bg-blue-900/40 text-blue-700' : 'bg-blue-50 text-blue-700',
  }

  return (
    <span {...props} className={`inline-flex max-w-full items-center gap-1 overflow-hidden rounded-md px-2 text-xs font-semibold leading-xs font-features-['lnum'_1,'pnum'_1] ${sizes[size]} ${colors[tone]} ${className}`}>
      {icon ? <span className="flex size-3 shrink-0 items-center justify-center" aria-hidden="true">{icon}</span> : dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />}
      <span className="min-w-0 truncate">{children}</span>
      {onDismiss && (
        <button type="button" aria-label={dismissLabel} onClick={onDismiss} className="flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-xs focus-visible:outline-1 focus-visible:outline-current">
          <span aria-hidden="true" className="size-3 bg-current" style={{ mask: 'url(/badge-dismiss.svg) center / contain no-repeat' }} />
        </button>
      )}
    </span>
  )
}