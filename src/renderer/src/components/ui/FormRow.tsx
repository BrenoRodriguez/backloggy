import { cva, type VariantProps } from 'class-variance-authority'

const formRowVariants = cva('', {
  variants: {
    variant: {
      default: 'flex w-full gap-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type FormRowProps = VariantProps<typeof formRowVariants> & {
  children: React.ReactNode
}

export const FormRow = ({ children, variant }: FormRowProps) => {
  return <div className={formRowVariants({ variant })}>{children}</div>
}
