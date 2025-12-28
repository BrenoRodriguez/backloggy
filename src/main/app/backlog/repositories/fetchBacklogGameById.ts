import { prisma } from '../../../lib/prisma'
import { GameEditSchema } from '../schemas'

export const fetchBacklogGameById = async (id?: number) => {
  const game = await prisma.games.findFirst({
    where: { id },
    include: {
      listsEntries: {
        where: {
          lists: { isMain: true },
        },
      },
    },
  })

  return GameEditSchema.parse(game)
}
