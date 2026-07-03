import type { GameListItem } from '../types'
import { GameCard } from './GameCard'

type GameListProps = {
  games: GameListItem[]
}

export function GameList({ games }: GameListProps) {
  return (
    <section className='grid grid-cols-3 place-content-center'>
      {games.map((game) => (
        <GameCard key={game.igdbId} game={game} />
      ))}
    </section>
  )
}
