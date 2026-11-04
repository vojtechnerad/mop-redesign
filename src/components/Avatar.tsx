import { useState } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { useTheme } from '../Theme'

export type AvatarSize = 'xs' | 'small' | 'default' | 'large' | 'xl'

export type AvatarProps = Omit<ComponentPropsWithRef<'span'>, 'size' | 'children'> & {
  name?: string
  initials?: string
  src?: string
  size?: AvatarSize
  showStatus?: boolean
  statusLabel?: string
  theme?: 'light' | 'dark'
}

const sizes: Record<AvatarSize, string> = {
  xs: 'size-6 text-xs leading-xs',
  small: 'size-8 text-xs leading-xs',
  default: 'size-10 text-sm leading-sm',
  large: 'size-12 text-base leading-base',
  xl: 'size-16 text-xl leading-xl',
}

export default function Avatar({
  name,
  initials,
  src,
  size = 'default',
  showStatus = false,
  statusLabel = 'Online',
  theme: themeOverride,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: AvatarProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const nameParts = name?.trim().split(/\s+/).filter(Boolean) ?? []
  const fallback = initials ?? (nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` : nameParts[0]?.[0] ?? '')
  const label = ariaLabel ?? name ?? (fallback || 'Avatar')
  const showPhoto = Boolean(src && failedSrc !== src)

  return (
    <span
      {...props}
      role="img"
      aria-label={showStatus ? `${label}, ${statusLabel}` : label}
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full font-bold font-features-['lnum'_1,'pnum'_1] ${sizes[size]} ${className}`}
    >
      {showPhoto ? (
        <img src={src} alt="" onError={() => setFailedSrc(src ?? null)} onLoad={() => setFailedSrc(null)} className="absolute inset-0 size-full rounded-full object-cover" />
      ) : (
        <>
          <img src={`/avatar-initials-${size}.svg`} alt="" aria-hidden="true" className="absolute inset-0" />
          <span className="relative max-w-full overflow-hidden whitespace-nowrap text-brand-800">{fallback.toLocaleUpperCase()}</span>
        </>
      )}
      <span className={`pointer-events-none absolute inset-0 rounded-full border-2 ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100'}`} aria-hidden="true" />
      {showStatus && <img src={`/avatar-status-${size}.svg`} alt="" aria-hidden="true" className="absolute right-0 bottom-0" />}
    </span>
  )
}

export type AvatarGroupSize = 'small' | 'default' | 'large'
export type AvatarGroupItem = Pick<AvatarProps, 'name' | 'initials' | 'src' | 'showStatus' | 'statusLabel'>

export type AvatarGroupProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  items: AvatarGroupItem[]
  size?: AvatarGroupSize
  total?: number
  theme?: 'light' | 'dark'
}

const groupSizes: Record<AvatarGroupSize, { overlap: string; overflow: string }> = {
  small: { overlap: '-ml-2', overflow: 'size-8 text-sm leading-sm' },
  default: { overlap: '-ml-2.5', overflow: 'size-10 text-base leading-base' },
  large: { overlap: '-ml-3', overflow: 'size-12 text-xl leading-xl' },
}

export function AvatarGroup({ items, size = 'default', total, theme: themeOverride, className = '', ...props }: AvatarGroupProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const visible = items.slice(0, 3)
  const overflow = Math.max(total ?? items.length, items.length) - visible.length
  const { overlap, overflow: overflowSize } = groupSizes[size]

  return (
    <div {...props} role="group" className={`inline-flex items-center ${className}`}>
      {visible.map((item, index) => (
        <Avatar key={index} {...item} size={size} theme={theme} className={index > 0 ? overlap : ''} />
      ))}
      {overflow > 0 && (
        <span
          role="img"
          aria-label={`${overflow} more`}
          className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 font-bold font-features-['lnum'_1,'pnum'_1] ${overflowSize} ${visible.length ? overlap : ''} ${theme === 'dark' ? 'border-neutral-700 bg-neutral-950 text-neutral-50' : 'border-neutral-100 bg-white text-neutral-900'}`}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}