import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type CardProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  variant?: 'default' | 'borderless'
  title?: ReactNode
  description?: ReactNode
  headerAction?: ReactNode
  footer?: ReactNode
  theme?: 'light' | 'dark'
}

export default function Card({
  variant = 'default',
  title,
  description,
  headerAction,
  footer,
  theme: themeOverride,
  className = '',
  children,
  ...props
}: CardProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const hasHeader = title != null || description != null || headerAction != null

  return (
    <div
      {...props}
      className={`flex w-full max-w-85 min-w-0 flex-col gap-6 rounded-lg p-6 font-features-['lnum'_1,'pnum'_1] ${theme === 'dark' ? 'bg-neutral-950 text-[#fafafa]' : 'bg-white text-neutral-900'} ${variant === 'default' ? theme === 'dark' ? 'border border-white/10' : 'border border-neutral-200' : ''} ${className}`}
    >
      {hasHeader && (
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {title != null && <h3 className="text-xl font-semibold leading-xl wrap-break-word">{title}</h3>}
            {description != null && <div className={`text-sm leading-sm wrap-break-word ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>{description}</div>}
          </div>
          {headerAction != null && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      {children != null && <div className="min-w-0 text-base leading-base wrap-break-word">{children}</div>}
      {footer != null && <div className="flex min-w-0 flex-wrap items-start gap-2">{footer}</div>}
    </div>
  )
}