import { cva, type VariantProps } from 'class-variance-authority'
import type { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PolymorphicComponentProps } from '../../types'

const titleVariants = cva('', {
  variants: {
    type: {
      default: 'text-center',
      header: 'select-none first-letter:text-accent-light',
      settings: 'text-center',
    },
    size: {
      default: 'text-3xl',
      header: 'text-4xl',
      settings: 'text-2xl',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'default',
  },
})

type TitleExtraProps = {
  className?: string
} & VariantProps<typeof titleVariants>

type TitleProps<T extends ElementType = 'h1'> = PolymorphicComponentProps<
  T,
  TitleExtraProps
>

export const Title = <T extends ElementType>({
  children,
  as,
  className,
  type,
  size,
  ...props
}: TitleProps<T>) => {
  const Component = as || 'h2'
  return (
    <Component
      {...props}
      className={twMerge(titleVariants({ type, size }), className)}
    >
      {children}
    </Component>
  )
}
