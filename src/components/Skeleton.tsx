import type { ComponentPropsWithRef } from 'react'
import { useTheme } from '../Theme'

export type SkeletonProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  shape?: 'line' | 'block' | 'circle'
  size?: 'small' | 'default' | 'large'
  theme?: 'light' | 'dark'
}

const shapes = {
  line: {
    small: 'h-2 w-30 rounded-xs',
    default: 'h-3 w-47.5 rounded-sm',
    large: 'h-4 w-65 rounded-sm',
  },
  block: {
    small: 'h-13 w-30 rounded-md',
    default: 'h-19 w-45 rounded-md',
    large: 'h-25 w-60 rounded-md',
  },
  circle: {
    small: 'size-8 rounded-full',
    default: 'size-11 rounded-full',
    large: 'size-14 rounded-[22px]',
  },
} as const

export default function Skeleton({
  shape = 'line',
  size = 'default',
  theme: themeOverride,
  className = '',
  'aria-hidden': ariaHidden = true,
  ...props
}: SkeletonProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme

  return (
    <div
      {...props}
      aria-hidden={ariaHidden}
      className={`max-w-full shrink-0 motion-safe:animate-pulse ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'} ${shapes[shape][size]} ${className}`}
    />
  )
}