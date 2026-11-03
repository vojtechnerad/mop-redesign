import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type AlertTone = 'info' | 'success' | 'warning' | 'error'

export type AlertProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> & {
  title: ReactNode
  description?: ReactNode
  tone?: AlertTone
  showIcon?: boolean
  onDismiss?: () => void
  dismissLabel?: string
  theme?: 'light' | 'dark'
}

export default function Alert({
  title,
  description,
  tone = 'info',
  showIcon = true,
  onDismiss,
  dismissLabel = 'Dismiss alert',
  theme: themeOverride,
  className = '',
  ...props
}: AlertProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const titleColor = {
    info: theme === 'dark' ? 'text-blue-500' : 'text-blue-600',
    success: theme === 'dark' ? 'text-green-600' : 'text-green-700',
    warning: theme === 'dark' ? 'text-yellow-500' : 'text-yellow-700',
    error: theme === 'dark' ? 'text-red-500' : 'text-red-700',
  }[tone]

  return (
    <div
      {...props}
      className={`w-full max-w-100 min-w-0 rounded-md border-1 px-3 py-2 shadow-sm font-features-['lnum'_1,'pnum'_1] ${theme === 'dark' ? 'border-white/10 bg-neutral-925' : 'border-neutral-200 bg-white'} ${className}`}
    >
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className={`flex min-w-0 items-center gap-2 ${titleColor}`}>
          {showIcon && (
            <img src={`/alert-${tone}-${theme}.svg`} alt="" aria-hidden="true" width={16} height={16} className="shrink-0" />
          )}
          <div className="min-w-0 text-sm leading-lg font-semibold wrap-break-word">{title}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            title={dismissLabel}
            className="-m-2 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40"
          >
            <img src={`/alert-close-${tone}-${theme}.svg`} alt="" aria-hidden="true" width={14} height={14} />
          </button>
        )}
      </div>
      {description !== undefined && description !== null && (
        <div className={`pt-1 text-xs font-regular wrap-break-word ${showIcon ? 'pl-6' : ''} ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-600'}`}>
          {description}
        </div>
      )}
    </div>
  )
}