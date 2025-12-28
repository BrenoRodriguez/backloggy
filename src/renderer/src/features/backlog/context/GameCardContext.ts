import { createContext, useContext } from 'react'
import type { GameCard } from '../../../../../shared/types'

export const GameCardContext = createContext<GameCard | undefined>(undefined)

export const useGameCard = () => {
  const context = useContext(GameCardContext)

  if (!context) {
    throw new Error('useGameCard must be used within a GameCardProvider!')
  }

  return context
}
