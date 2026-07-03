'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type LinkProps = {
  href: string
  children: React.ReactNode
  shouldColorWhenActive?: boolean
  className?: string
  disabled?: boolean
} & VariantProps<typeof linkVariants>

const linkVariants = cva('transtion-colors duration-200 ease-in', {
  variants: {
    variant: {
      title: '',
      default: 'select-none font-medium uppercase hover:text-accent-normal',
      authForms: 'py-2 font-medium text-lg hover:text-accent-normal',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function NavLink({
  href,
  children,
  className,
  shouldColorWhenActive = false,
  variant,
  disabled = false,
}: LinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return disabled ? (
    <div
      className={twMerge(
        'cursor-default opacity-30',
        linkVariants({ variant }),
        className,
      )}
    >
      {children}
    </div>
  ) : (
    <Link
      href={href}
      className={twMerge(
        linkVariants({ variant }),
        shouldColorWhenActive && isActive && 'text-accent-normal',
        className,
      )}
    >
      {children}
    </Link>
  )
}
