import type {
  GameCard,
  GameQueryOptions,
  MetadataKeys,
} from '../../../../../shared/types'
import { prisma } from '../../../../lib/prisma'
import { GameCardSchema } from '../../schemas/gameCard'
import { createBacklogOrderBy } from './createBacklogOrderBy'
import { createBacklogSelect } from './createBacklogSelect'
import { createBacklogWhere } from './createBacklogWhere'

export const fetchBacklogGames = async (
  { search, filters, sort, currentPage, itemsPerPage }: GameQueryOptions,
  metadata: MetadataKeys,
): Promise<GameCard[]> => {
  const games = await prisma.listEntries.findMany({
    where: {
      game: createBacklogWhere(filters, search),
    },
    select: createBacklogSelect(metadata),
    orderBy: createBacklogOrderBy(sort),
    skip: itemsPerPage * (currentPage - 1),
    take: itemsPerPage,
  })

  return GameCardSchema.parse(games)
}

/*
where: { lists: { isMain: true } },
orderBy:
  !sort || !sort.option || sort.option === 'position'
    ? { position: sort?.order ?? 'asc' }
    : undefined,

*/
