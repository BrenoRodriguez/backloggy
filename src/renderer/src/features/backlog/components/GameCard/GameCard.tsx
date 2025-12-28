import { twJoin } from 'tailwind-merge'
import { GameCardProvider } from '../../context'
import { CardBody } from './CardBody'
import { CardCover } from './CardCover'
import { CardHeader } from './CardHeader'
import type { GameCard as GameCardType } from '../../../../../../shared/types'

type GameCardProps = {
  game: GameCardType
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <GameCardProvider game={game}>
      <div
        className={twJoin(
          'flex h-[300px] w-[410px] rounded-r-sm border border-stone-900',
          'bg-stone-900/40 sm:w-full sm:max-w-[480px]',
        )}
      >
        <CardCover />
        <div className='flex flex-1 flex-col items-center'>
          <CardHeader />
          <CardBody />
        </div>
      </div>
    </GameCardProvider>
  )
}
