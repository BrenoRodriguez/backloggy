import { createContext, useContext } from 'react'
import type { GameCard } from '../../../../../shared/types'

export const BacklogContext = createContext<GameCard[] | undefined>(undefined)

export const useBacklog = () => {
  const context = useContext(BacklogContext)

  if (!context) {
    throw new Error('BacklogGamesContext')
  }

  return context
}
