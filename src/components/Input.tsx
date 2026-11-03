import { useId } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'size' | 'children'> & {
  label?: ReactNode
  description?: ReactNode
  status?: 'default' | 'error' | 'success'
  theme?: 'light' | 'dark'
}

export default function Input({
  label,
  description,
  status = 'default',
  theme: themeOverride,
  id,
  disabled,
  readOnly,
  className = '',
  'aria-describedby': describedBy,
  'aria-invalid': invalid,
  ...inputProps
}: InputProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasLabel = label !== undefined && label !== null
  const hasDescription = description !== undefined && description !== null
  const descriptionId = `${inputId}-description`
  const mutedColor = theme === 'dark' ? 'text-neutral-200' : 'text-neutral-600'
  const mutedBackground = readOnly || (disabled && status === 'default')
  const fieldColor = theme === 'dark'
    ? `${mutedBackground ? 'bg-neutral-950' : 'bg-neutral-900'} text-neutral-50 has-[:enabled:not(:focus):not([readonly])]:hover:bg-neutral-950`
    : `${mutedBackground ? 'bg-neutral-50' : 'bg-white'} text-neutral-900 has-[:enabled:not(:focus):not([readonly])]:hover:bg-neutral-50`
  const statusColor = {
    default: theme === 'dark'
      ? 'border-neutral-700 focus-within:ring-blue-300/50'
      : 'border-neutral-100 focus-within:ring-blue-300/40',
    error: theme === 'dark'
      ? 'border-red-500 focus-within:ring-red-400/50'
      : 'border-red-700 focus-within:ring-red-400/40',
    success: theme === 'dark'
      ? 'border-green-700 focus-within:ring-green-400/50'
      : 'border-green-600 focus-within:ring-green-400/40',
  }[status]

  return (
    <div className={`flex w-full max-w-90 min-w-0 flex-col gap-2 font-features-['lnum'_1,'pnum'_1] ${disabled ? 'opacity-45' : ''} ${className}`}>
      {hasLabel && (
        <label htmlFor={inputId} className={`text-sm font-semibold ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'}`}>
          {label}
        </label>
      )}
      <div className={`flex h-10 w-full min-w-0 items-center gap-2 rounded-md border-1 px-3 shadow-xs focus-within:shadow-none focus-within:ring-[3px] ${fieldColor} ${statusColor}`}>
        <input
          {...inputProps}
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid ?? (status === 'error' ? true : undefined)}
          aria-describedby={[describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined}
          className={`min-w-0 flex-1 bg-transparent text-base font-regular outline-none disabled:cursor-not-allowed ${theme === 'dark' ? 'placeholder:text-neutral-200' : 'placeholder:text-neutral-600'}`}
        />
        {status !== 'default' && (
          <img
            src={`/input-${status}-${theme}.svg`}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="shrink-0"
          />
        )}
      </div>
      {hasDescription && (
        <div id={descriptionId} className={`text-xs font-medium wrap-break-word ${mutedColor}`}>
          {description}
        </div>
      )}
    </div>
  )
}