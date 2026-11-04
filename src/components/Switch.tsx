import { useId } from 'react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useTheme } from '../Theme'

export type SwitchProps = Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size' | 'children' | 'role'
> & {
  label?: ReactNode
  description?: ReactNode
  theme?: 'light' | 'dark'
}

const trackVariants = [
  { state: 'off', className: 'block peer-checked:hidden peer-enabled:group-hover/switch:hidden peer-focus-visible:hidden' },
  { state: 'on', className: 'hidden peer-checked:block peer-enabled:group-hover/switch:hidden peer-focus-visible:hidden' },
  { state: 'off-hover', className: 'hidden peer-[:enabled:not(:checked):not(:focus-visible)]:group-hover/switch:block' },
  { state: 'on-hover', className: 'hidden peer-[:enabled:checked:not(:focus-visible)]:group-hover/switch:block' },
  { state: 'off-focus', className: 'hidden peer-[:not(:checked):focus-visible]:block' },
  { state: 'on-focus', className: 'hidden peer-[:checked:focus-visible]:block' },
] as const

export default function Switch({
  label,
  description,
  theme: themeOverride,
  id,
  disabled,
  className = '',
  'aria-describedby': describedBy,
  'aria-labelledby': labelledBy,
  ...inputProps
}: SwitchProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hasLabel = label !== undefined && label !== null
  const hasDescription = description !== undefined && description !== null
  const labelId = `${inputId}-label`
  const descriptionId = `${inputId}-description`
  const mutedColor = theme === 'dark' ? 'text-neutral-200' : 'text-neutral-600'

  return (
    <label
      htmlFor={inputId}
      className={`group/switch inline-flex max-w-full items-start gap-2 font-features-['lnum'_1,'pnum'_1] ${disabled ? `cursor-not-allowed opacity-45 ${mutedColor}` : `cursor-pointer ${theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900'}`} ${className}`}
    >
      <span className="relative flex h-5.5 w-10 shrink-0">
        <input
          {...inputProps}
          id={inputId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          aria-labelledby={[labelledBy, hasLabel ? labelId : undefined].filter(Boolean).join(' ') || undefined}
          aria-describedby={[describedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined}
          className="peer absolute inset-0 z-10 m-0 size-full cursor-[inherit] opacity-0"
        />
        {trackVariants.map(({ state, className: stateClassName }) => {
          const isFocus = state.endsWith('-focus')

          return (
            <img
              key={state}
              src={`${import.meta.env.BASE_URL}switch-${state}-${theme}.svg`}
              alt=""
              aria-hidden="true"
              data-switch-state={state}
              width={isFocus ? 46 : 40}
              height={isFocus ? 28 : 22}
              draggable={false}
              className={`pointer-events-none absolute max-w-none ${isFocus ? '-left-0.75 -top-0.75' : 'left-0 top-0'} ${stateClassName}`}
            />
          )
        })}
      </span>
      {(hasLabel || hasDescription) && (
        <span className="flex min-w-0 flex-col gap-0.75 wrap-break-word">
          {hasLabel && (
            <span id={labelId} className="text-sm font-semibold">
              {label}
            </span>
          )}
          {hasDescription && (
            <span id={descriptionId} className={`text-xs font-medium ${mutedColor}`}>
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  )
}