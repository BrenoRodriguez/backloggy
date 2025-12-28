import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
  }

const buttonVariants = cva('transition-all duration-200 ease-in', {
  variants: {
    variant: {
      default:
        'w-full cursor-pointer rounded-sm bg-accent-normal py-2 uppercase tracking-wider hover:bg-accent-light',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const Button = ({ children, variant, ...props }: ButtonProps) => {
  return (
    <button {...props} className={twMerge(buttonVariants({ variant }))}>
      {children}
    </button>
  )
}
