import type { Prisma } from '../../../../../../generated/prisma/client'
import type { GameSortSettings } from '../../../../../shared/types'

export const createBacklogOrderBy = (
  sort?: GameSortSettings,
): Prisma.ListEntriesOrderByWithRelationInput | undefined => {
  if (!sort || !sort.option || sort.option === 'position') {
    return {
      position: sort?.order ?? 'asc',
    }
  }

  return {
    game: {
      [sort.option]: sort.order || 'asc',
    },
  }
}
