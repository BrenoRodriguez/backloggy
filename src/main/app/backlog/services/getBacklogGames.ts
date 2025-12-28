import type { GameCard, GameQueryOptions } from '../../../../shared/types'
import { fetchBacklogGames, fetchDisplayedMetadata } from '../repositories'

export const getBacklogGames = async (
  queryOptions: GameQueryOptions,
): Promise<GameCard[]> => {
  const { displayedMetadata } = await fetchDisplayedMetadata()

  return await fetchBacklogGames(queryOptions, displayedMetadata)
}
