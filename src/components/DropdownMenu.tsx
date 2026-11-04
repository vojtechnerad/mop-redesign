import * as Menu from '@radix-ui/react-dropdown-menu'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import Dropdown from './Dropdown'

export const DropdownMenu = Menu.Root
export const DropdownMenuSub = Menu.Sub

export function DropdownMenuGroup({ className = '', ...props }: ComponentPropsWithRef<typeof Menu.Group>) {
  return <Menu.Group {...props} className={`flex flex-col gap-1 ${className}`} />
}

export function DropdownMenuTrigger(props: ComponentPropsWithRef<typeof Menu.Trigger>) {
  return <Menu.Trigger {...props} asChild />
}

export function DropdownMenuContent({
  children,
  className = '',
  style,
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: ComponentPropsWithRef<typeof Menu.Content>) {
  return (
    <Menu.Portal>
      <Menu.Content {...props} sideOffset={sideOffset} collisionPadding={collisionPadding} asChild>
        <Dropdown
          className={`z-50 overflow-y-auto ${className}`}
          style={{ width: 244, maxWidth: 'calc(100vw - 16px)', maxHeight: 'var(--radix-dropdown-menu-content-available-height)', ...style }}
        >
          {children}
        </Dropdown>
      </Menu.Content>
    </Menu.Portal>
  )
}

export function DropdownMenuSubContent({
  children,
  className = '',
  style,
  sideOffset = 0,
  alignOffset = -6,
  collisionPadding = 8,
  ...props
}: ComponentPropsWithRef<typeof Menu.SubContent>) {
  return (
    <Menu.Portal>
      <Menu.SubContent {...props} sideOffset={sideOffset} alignOffset={alignOffset} collisionPadding={collisionPadding} asChild>
        <Dropdown
          className={`z-50 overflow-y-auto ${className}`}
          style={{ width: 244, maxWidth: 'min(calc(100vw - 16px), var(--radix-dropdown-menu-content-available-width))', maxHeight: 'var(--radix-dropdown-menu-content-available-height)', ...style }}
        >
          {children}
        </Dropdown>
      </Menu.SubContent>
    </Menu.Portal>
  )
}

export function DropdownMenuLabel({ className = '', ...props }: ComponentPropsWithRef<typeof Menu.Label>) {
  return <Menu.Label {...props} className={`px-2.5 pb-1 pt-1.5 text-[10px] font-semibold leading-3 uppercase text-neutral-600 dark:text-neutral-300 ${className}`} />
}

export function DropdownMenuSeparator({ className = '', ...props }: ComponentPropsWithRef<typeof Menu.Separator>) {
  return <Menu.Separator {...props} className={`h-0.5 shrink-0 rounded-md bg-neutral-200 dark:bg-neutral-700 ${className}`} />
}

type ButtonOptions = {
  variant?: 'default' | 'danger'
  leadingIcon?: ReactNode
}

function buttonClassName(variant: ButtonOptions['variant'], className: string) {
  const colors = variant === 'danger'
    ? 'text-red-700 data-[highlighted]:bg-red-100 data-[state=open]:bg-red-100 dark:text-red-500 dark:data-[highlighted]:bg-red-900 dark:data-[state=open]:bg-red-900'
    : 'text-neutral-900 data-[highlighted]:bg-neutral-50 data-[state=open]:bg-neutral-50 dark:text-neutral-50 dark:data-[highlighted]:bg-neutral-800 dark:data-[state=open]:bg-neutral-800'

  return `flex h-9 min-w-0 w-full shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-3 text-left text-sm font-semibold leading-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${colors} ${className}`
}

export type DropdownMenuButtonProps = ComponentPropsWithRef<typeof Menu.Item> & ButtonOptions

export function DropdownMenuButton({ variant = 'default', leadingIcon, children, className = '', ...props }: DropdownMenuButtonProps) {
  return (
    <Menu.Item {...props} className={buttonClassName(variant, className)}>
      {leadingIcon && <span className="flex shrink-0 items-center" aria-hidden="true">{leadingIcon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </Menu.Item>
  )
}

export type DropdownMenuSubTriggerProps = ComponentPropsWithRef<typeof Menu.SubTrigger> & ButtonOptions

export function DropdownMenuSubTrigger({ variant = 'default', leadingIcon, children, className = '', ...props }: DropdownMenuSubTriggerProps) {
  return (
    <Menu.SubTrigger {...props} className={buttonClassName(variant, className)}>
      {leadingIcon && <span className="flex shrink-0 items-center" aria-hidden="true">{leadingIcon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <img src={`${import.meta.env.BASE_URL}dropdown-menu-chevron.svg`} alt="" width="16" height="16" className="shrink-0 dark:invert" />
    </Menu.SubTrigger>
  )
}