import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = ComponentProps<'textarea'> &
  VariantProps<typeof textAreaVariants> & {
    hasError?: string
    className?: string
  }

const textAreaVariants = cva('', {
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

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant, className, hasError, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        className={twMerge(
          textAreaVariants({ variant }),
          hasError && '',
          className,
        )}
      ></textarea>
    )
  },
)
