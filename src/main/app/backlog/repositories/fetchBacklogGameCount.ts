import { prisma } from '../../../lib/prisma'

export const fetchBacklogGameCount = async (): Promise<number> => {
  return await prisma.games.count({
    where: {
      listsEntries: {
        every: {
          lists: {
            isMain: true,
          },
        },
      },
    },
  })
}
