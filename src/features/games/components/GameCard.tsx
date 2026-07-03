import { replaceImageSize } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import type { GameListItem } from '../types'

type GameCardProps = {
  game: GameListItem
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.slug}`} className='flex'>
      <Image
        src={game.cover ? `https:${replaceImageSize(game.cover)}` : ''}
        alt={`${game.name} cover art`}
        width={100}
        height={100}
      />
      <div>
        <div className='flex'>
          {game.name}
          <span>{`(${game.releaseDate === '' ? 'TBD' : game.releaseDate})`}</span>
        </div>
        <div className='flex'>
          {game.platforms.map((platform) => (
            <div key={`${platform}${game.name}`}>{platform}</div>
          ))}
        </div>
      </div>
    </Link>
  )
}
