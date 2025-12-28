import { useQuery } from '@tanstack/react-query'
import { Route } from '../../../routes/backlog.edit.$gameId'
import { getBacklogGameById } from '../utils'

export const useGameToEdit = () => {
  const { gameId } = Route.useParams()

  const gameIdNumber = Number(gameId)

  const { data: gameToEdit } = useQuery({
    queryKey: ['get-backlog-game-by-id', gameIdNumber],
    queryFn: () => {
      return getBacklogGameById(gameIdNumber)
    },
    enabled: Number.isFinite(gameIdNumber),
  })

  return { gameToEdit }
}
