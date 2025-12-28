import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    hasError?: string
    className?: string
  }

const inputVariants = cva('', {
  variants: {
    variant: {
      default:
        'w-full rounded-sm border border-stone-800 bg-stone-900/40 px-2 py-1 text-lg transition-all duration-200 ease-in hover:border-accent-light focus:border-accent-light focus:outline-none disabled:cursor-not-allowed disabled:select-none disabled:border-stone-900 disabled:text-stone-500 disabled:opacity-80',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, variant, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={twMerge(
          inputVariants({ variant }),
          hasError && '',
          className,
        )}
      />
    )
  },
)
