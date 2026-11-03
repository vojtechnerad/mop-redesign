import { useId, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type CheckboxProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size' | 'children'
> & {
  label?: ReactNode
  description?: ReactNode
  indeterminate?: boolean
  theme?: 'light' | 'dark'
}

export default function Checkbox({
  label,
  description,
  indeterminate = false,
  theme: themeOverride,
  id,
  ref,
  disabled,
  className = '',
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  ...inputProps
}: CheckboxProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const hasLabel = label !== undefined && label !== null
  const hasDescription = description !== undefined && description !== null
  const descriptionId = `${inputId}-description`
  const labelId = `${inputId}-label`

  useImperativeHandle(ref, () => inputRef.current!, [])

  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const boxColors = theme === 'dark'
    ? 'border-neutral-700 bg-neutral-900 peer-checked:border-brand-500 peer-checked:bg-brand-500 peer-indeterminate:border-brand-500 peer-indeterminate:bg-brand-500 peer-enabled:group-hover/checkbox:border-neutral-600 peer-enabled:group-hover/checkbox:bg-neutral-950 peer-enabled:peer-checked:group-hover/checkbox:border-brand-300 peer-enabled:peer-checked:group-hover/checkbox:bg-brand-300 peer-enabled:peer-indeterminate:group-hover/checkbox:border-brand-300 peer-enabled:peer-indeterminate:group-hover/checkbox:bg-brand-300'
    : 'border-neutral-100 bg-white peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-indeterminate:border-brand-700 peer-indeterminate:bg-brand-700 peer-enabled:group-hover/checkbox:border-neutral-200 peer-enabled:group-hover/checkbox:bg-neutral-50 peer-enabled:peer-checked:group-hover/checkbox:border-brand-800 peer-enabled:peer-checked:group-hover/checkbox:bg-brand-800 peer-enabled:peer-indeterminate:group-hover/checkbox:border-brand-800 peer-enabled:peer-indeterminate:group-hover/checkbox:bg-brand-800'

  return (
    <label
      htmlFor={inputId}
      className={`group/checkbox inline-flex max-w-full items-start gap-2 font-features-['lnum'_1,'pnum'_1] ${disabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'} ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'} ${className}`}
    >
      <span className="relative mt-0.5 flex size-4 shrink-0">
        <input
          {...inputProps}
          ref={inputRef}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-labelledby={[labelledBy, hasLabel ? labelId : undefined].filter(Boolean).join(' ') || undefined}
          aria-describedby={[describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined}
          className="peer absolute inset-0 z-10 m-0 size-full cursor-[inherit] opacity-0"
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none flex size-4 items-center justify-center rounded-xs border-1 shadow-xs peer-checked:shadow-none peer-indeterminate:shadow-none peer-focus-visible:shadow-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-blue-300/40 peer-checked:*:data-check:block peer-indeterminate:*:data-check:hidden peer-indeterminate:*:data-mixed:block ${boxColors}`}
        >
          <img
            data-check=""
            src={`/checkbox-check-${theme}.svg`}
            alt=""
            width={12}
            height={12}
            draggable={false}
            className="hidden shrink-0"
          />
          <img
            data-mixed=""
            src={`/checkbox-mixed-${theme}.svg`}
            alt=""
            width={12}
            height={12}
            draggable={false}
            className="hidden shrink-0"
          />
        </span>
      </span>
      {(hasLabel || hasDescription) && (
        <span className="flex min-w-0 flex-col gap-1 wrap-break-word">
          {hasLabel && (
            <span id={labelId} className="text-sm font-semibold">
              {label}
            </span>
          )}
          {hasDescription && (
            <span
              id={descriptionId}
              className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-600'}`}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}