import { twJoin } from 'tailwind-merge'
import { useBacklog } from '../context'
import { GameCard } from './GameCard'

export const BacklogGames = () => {
  const games = useBacklog()
  return (
    <section
      className={twJoin(
        'grid w-full grid-cols-1 justify-items-center gap-4',
        'lg:grid-cols-2 xl:w-[1500px] xl:grid-cols-3',
      )}
    >
      {games.map((game) => (
        <GameCard key={`gameId${game.id}`} game={game} />
      ))}
    </section>
  )
}
