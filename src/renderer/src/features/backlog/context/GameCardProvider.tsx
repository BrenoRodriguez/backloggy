import type { GameCard } from '../../../../../shared/types'
import { GameCardContext } from './GameCardContext'

type GameCardProps = {
  children: React.ReactNode
  game: GameCard
}

export const GameCardProvider = ({ children, game }: GameCardProps) => {
  return (
    <GameCardContext.Provider value={game}>{children}</GameCardContext.Provider>
  )
}
