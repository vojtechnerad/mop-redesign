import type { ReactNode } from 'react'
import Button from './Button'
import type { ButtonProps } from './Button'

export type IconButtonProps = Omit<ButtonProps, 'size' | 'variant' | 'loading' | 'leadingIcon' | 'trailingIcon' | 'children' | 'aria-label'> & {
  size?: 'small' | 'medium'
  variant?: 'ghost' | 'outline'
  children: ReactNode
  'aria-label': string
}

export default function IconButton({
  size = 'medium',
  variant = 'ghost',
  children,
  'aria-label': label,
  title,
  ...props
}: IconButtonProps) {
  return (
    <Button {...props} size={size === 'small' ? 'icon-small' : 'icon-medium'} variant={variant} aria-label={label} title={title ?? label}>
      <span className="flex size-6 shrink-0 items-center justify-center" aria-hidden="true">{children}</span>
    </Button>
  )
}