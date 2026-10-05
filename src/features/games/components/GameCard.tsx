import { CardTitle } from '@/components'
import { replaceImageSize } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import noCoverUrl from '../../../public/temporary-no-cover.png'
import type { GameListItem } from '../types'

type GameCardProps = {
  game: GameListItem
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.slug}`} className='flex h-36 gap-4'>
      <div className='h-36 w-25'>
        <Image
          src={
            game.cover ? `https:${replaceImageSize(game.cover)}` : noCoverUrl
          }
          alt={`${game.name} cover art`}
          className='size-full rounded-l-sm object-cover'
          width={100}
          height={100}
        />
      </div>
      <div>
        <div className='flex gap-1'>
          <CardTitle name={game.name} variant='games' />
          <span>{`(${game.releaseDate === '' ? 'TBD' : game.releaseDate})`}</span>
        </div>
        <div className='flex gap-1.5'>
          {game.platforms.map((platform) => (
            <div key={`${platform}${game.name}`}>{platform}</div>
          ))}
        </div>
      </div>
    </Link>
  )
}
