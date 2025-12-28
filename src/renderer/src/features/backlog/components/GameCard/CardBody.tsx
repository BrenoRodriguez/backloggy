import { twJoin } from 'tailwind-merge'
import { useGameCard } from '../../context'
import { formatGenres, formatLength, formatMetadata } from '../../utils'
import { CardBodyItem } from './CardBodyItem'

export const CardBody = () => {
  const { genres, status, metadata, reviewScore, length, platform } =
    useGameCard()

  return (
    <div
      className={twJoin(
        'flex w-full flex-1 flex-col items-center',
        'justify-between py-5 text-white/90',
      )}
    >
      <CardBodyItem value={genres} formatter={formatGenres} />
      <CardBodyItem value={status} />
      <CardBodyItem
        value={metadata}
        formatter={(value) => formatMetadata(status, value, reviewScore)}
      />
      <CardBodyItem value={length} formatter={formatLength} />
      <CardBodyItem value={platform} />
    </div>
  )
}
