import type { ComponentPropsWithRef } from 'react'
import { useTheme } from '../Theme'

export type DropdownProps = ComponentPropsWithRef<'div'> & {
  theme?: 'light' | 'dark'
}

export default function Dropdown({
  theme: themeOverride,
  className = '',
  children,
  ...props
}: DropdownProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme

  return (
    <div
      {...props}
      className={`flex min-h-8.5 w-62.5 max-w-full flex-col gap-1 rounded-xl border-[0.5px] p-1.5 shadow-md ${theme === 'dark' ? 'border-neutral-700 bg-neutral-925' : 'border-neutral-100 bg-white'} ${className}`}
    >
      {children}
    </div>
  )
}