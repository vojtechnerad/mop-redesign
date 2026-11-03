import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'
import Spinner from './Spinner'

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'small' | 'default' | 'large' | 'icon'

export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'size'> & {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  loading?: boolean
  theme?: 'light' | 'dark'
}

export default function Button({
  variant = 'default',
  size = 'default',
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled = false,
  theme: themeOverride,
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const sizes: Record<ButtonSize, string> = {
    small: 'h-8 min-w-22 gap-1.5 px-3',
    default: 'h-10 min-w-22 gap-2 px-4',
    large: 'h-12 min-w-22 gap-2 px-5',
    icon: 'h-10 w-22',
  }
  const colors: Record<ButtonVariant, string> = {
    default: theme === 'dark' ? 'bg-brand-800 text-white enabled:hover:bg-brand-600' : 'bg-brand-700 text-white enabled:hover:bg-brand-800',
    secondary: theme === 'dark' ? 'bg-neutral-900 text-neutral-50 enabled:hover:bg-neutral-800' : 'bg-neutral-50 text-neutral-900 enabled:hover:bg-neutral-100',
    outline: theme === 'dark' ? 'border border-neutral-700 bg-neutral-950 text-neutral-50 enabled:hover:bg-neutral-900' : 'border border-neutral-100 bg-white text-neutral-900 enabled:hover:bg-neutral-50',
    ghost: theme === 'dark' ? 'bg-neutral-950 text-neutral-50 enabled:hover:bg-neutral-900' : 'bg-white text-neutral-900 enabled:hover:bg-neutral-50',
    destructive: theme === 'dark' ? 'bg-red-800 text-white enabled:hover:bg-red-600' : 'bg-red-700 text-white enabled:hover:bg-red-800',
    link: theme === 'dark' ? 'bg-neutral-950 text-brand-500 enabled:hover:text-brand-300' : 'bg-white text-brand-600 enabled:hover:text-brand-700',
  }
  const spinnerVariant = variant === 'link' ? 'primary' : variant === 'default' || variant === 'destructive' || theme === 'dark' ? 'white' : 'black'
  const focusColor = variant === 'destructive'
    ? theme === 'dark' ? 'focus-visible:ring-red-400/50' : 'focus-visible:ring-red-400/40'
    : theme === 'dark' ? 'focus-visible:ring-blue-300/50' : 'focus-visible:ring-blue-300/40'

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex max-w-full items-center justify-center rounded-md text-sm font-semibold leading-sm font-features-['lnum'_1,'pnum'_1] focus-visible:outline-none focus-visible:ring-[3px] ${disabled ? 'cursor-not-allowed opacity-45' : loading ? 'cursor-wait' : 'cursor-pointer'} ${sizes[size]} ${colors[variant]} ${focusColor} ${className}`}
    >
      {loading ? (
        <>
          <span className="sr-only">{children}</span>
          <Spinner variant={spinnerVariant} aria-hidden="true" />
        </>
      ) : size === 'icon' ? (
        leadingIcon || children
      ) : (
        <>
          {leadingIcon && <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">{leadingIcon}</span>}
          <span className="min-w-0 truncate">{children}</span>
          {trailingIcon && <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">{trailingIcon}</span>}
        </>
      )}
    </button>
  )
}