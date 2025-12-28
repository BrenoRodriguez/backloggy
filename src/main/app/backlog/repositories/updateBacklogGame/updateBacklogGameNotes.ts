import { prisma } from '../../../../lib/prisma'

export const updateBacklogGameNotes = async (
  gameId: number,
  notes?: string,
) => {
  await prisma.listEntries.updateMany({
    where: {
      gameId,
      lists: {
        isMain: true,
      },
    },
    data: {
      notes,
    },
  })
}
