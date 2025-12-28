import type { Prisma } from '../../../../../../generated/prisma/client'
import type { MetadataKeys } from '../../../../../shared/types'

export const createBacklogSelect = (
  metadata: MetadataKeys,
): Prisma.ListEntriesSelect => {
  return {
    position: true,
    game: {
      select: {
        id: true,
        cover: true,
        name: true,
        genres: true,
        length: true,
        platform: true,
        status: true,
        reviewScore: true,
        [metadata]: true,
      },
    },
  }
}
