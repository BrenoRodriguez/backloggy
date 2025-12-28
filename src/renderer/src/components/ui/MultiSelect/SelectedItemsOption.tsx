import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

type SelectedItemsOptionProps = VariantProps<
  typeof selectedItemsOptionVariants
> & {
  children: React.ReactNode
  removeItem: () => void
}

const selectedItemsOptionVariants = cva('', {
  variants: {
    variant: {
      default:
        'flex cursor-default items-center justify-center gap-1 text-nowrap rounded-sm border border-stone-800 bg-stone-900/40 px-2 py-0.5 text-base transition-colors duration-200 ease-in hover:bg-stone-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const SelectedItemsOption = ({
  children,
  removeItem,
  variant,
}: SelectedItemsOptionProps) => {
  return (
    <div className={selectedItemsOptionVariants({ variant })}>
      {children}
      <button
        type='button'
        onClick={removeItem}
        className='cursor-pointer transition-colors duration-200 ease-in hover:text-accent-light'
      >
        <X strokeWidth={1} size={20} />
      </button>
    </div>
  )
}
