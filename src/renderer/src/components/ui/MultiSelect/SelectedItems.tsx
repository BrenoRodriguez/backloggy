import { cva, type VariantProps } from 'class-variance-authority'
import { SelectedItemsOption } from './SelectedItemsOption'
import { useSelectedItems } from '../../../hooks'

type SelectedItemsProps = VariantProps<typeof selectedItemsVariants> & {
  selectedItems: string[]
  onChange: (selectedItems: string[]) => void
}

const selectedItemsVariants = cva('', {
  variants: {
    variant: {
      default: 'flex gap-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const SelectedItems = ({
  selectedItems,
  onChange,
  variant,
}: SelectedItemsProps) => {
  const { removeItem } = useSelectedItems(selectedItems, onChange)

  return (
    <div className={selectedItemsVariants({ variant })}>
      {selectedItems.map((item, index) => (
        <SelectedItemsOption
          key={`${item + index}`}
          removeItem={removeItem(item)}
          variant={variant}
        >
          {item}
        </SelectedItemsOption>
      ))}
    </div>
  )
}
