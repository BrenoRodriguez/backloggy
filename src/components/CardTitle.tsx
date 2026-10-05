import { truncateText } from '@/features/backlog/utils/truncate-text'
import { cva, type VariantProps } from 'class-variance-authority'
import { Tooltip } from './ui/Tooltip'

const cardTitleVariants = cva('', {
  variants: {
    variant: {
      backlog:
        'w-full text-nowrap border-stone-900 border-b py-3 text-lg text-white',
      games: '',
    },
  },
  defaultVariants: {
    variant: 'backlog',
  },
})

type CardTitleProps = {
  name: string
  maxLength?: number
  shouldTruncate?: boolean
} & VariantProps<typeof cardTitleVariants>

export function CardTitle({
  name,
  maxLength = 30,
  shouldTruncate = true,
  variant,
}: CardTitleProps) {
  const { displayText, isTruncated } = truncateText(name, maxLength)

  if (!isTruncated || !shouldTruncate) return displayText

  return (
    <Tooltip label={displayText} className={cardTitleVariants({ variant })}>
      {name}
    </Tooltip>
  )
}
