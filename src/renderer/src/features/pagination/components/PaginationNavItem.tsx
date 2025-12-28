import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type PaginationNavItemProps = ComponentProps<'button'> & {
  children: React.ReactNode
  isPageActive?: boolean
}

export const PaginationNavItem = ({
  children,
  isPageActive,
  ...props
}: PaginationNavItemProps) => {
  return (
    <button
      className={twMerge(
        'flex size-12 cursor-pointer items-center justify-center rounded-sm',
        'border border-stone-800 bg-stone-900/40 text-lg transition-colors',
        'duration-200 ease-in hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-50',
        isPageActive && 'bg-accent-light',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
