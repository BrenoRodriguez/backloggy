'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
    className?: string
  }

const buttonVariants = cva('transition-all duration-200 ease-in', {
  variants: {
    variant: {
      default:
        'w-full cursor-pointer rounded-sm bg-accent-normal py-1.5 tracking-wider hover:bg-accent-light disabled:opacity-70',
      backlogEntryStatus:
        'flex w-full max-w-32 items-center justify-center gap-2 rounded-sm border border-neutral-700 bg-foreground px-2 py-1 text-neutral-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant }), className)}
    >
      {children}
    </button>
  )
}
