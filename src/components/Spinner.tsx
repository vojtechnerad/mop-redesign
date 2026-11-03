import type { ComponentPropsWithRef } from 'react'

export type SpinnerProps = Omit<ComponentPropsWithRef<'span'>, 'children'> & {
  variant?: 'primary' | 'black' | 'white'
}

const dots = [
  { index: 1, delay: '0s' },
  { index: 2, delay: '0.2s' },
  { index: 3, delay: '0.4s' },
] as const

export default function Spinner({
  variant = 'primary',
  className = '',
  'aria-label': label = 'Loading',
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      role="status"
      aria-label={label}
      className={`inline-flex h-4 w-12 shrink-0 items-center justify-center gap-1 ${className}`}
    >
      <style>{`@keyframes spinner-dot {
        0%, 100% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 1; }
      }`}</style>
      {dots.map(({ index, delay }) => (
        <img
          key={index}
          src={`/spinner-${variant}-${index}.svg`}
          alt=""
          aria-hidden="true"
          width={8}
          height={8}
          style={{ animationDelay: delay, animationFillMode: 'backwards' }}
          className="size-2 shrink-0 motion-safe:animate-[spinner-dot_1.4s_ease-in-out_infinite]"
        />
      ))}
    </span>
  )
}