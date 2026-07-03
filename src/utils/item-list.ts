import { GAME_SEARCH_CARD_LIMIT } from '@/features/games/constants/game-list'

type Countable<TWhere> = {
  count(args: { where?: TWhere }): Promise<number>
}

export async function getPageAmount<TWhere>(
  model: Countable<TWhere>,
  where: TWhere,
  limit = GAME_SEARCH_CARD_LIMIT,
): Promise<number> {
  const itemCount = await model.count({ where })

  return Math.ceil(itemCount / limit)
}
