import type { GameQueryOptions } from '../../../../../shared/types'

export const getBacklogGames = async (queryOptions: GameQueryOptions) => {
  return await window.api.getBacklogGames(queryOptions)
}
