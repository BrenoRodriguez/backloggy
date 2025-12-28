import { prisma } from '../../../../lib/prisma'
import { decrementGamesBacklogPosition } from './decrementGamesBacklogPosition'
import { incrementGamesBacklogPosition } from './incrementGamesBacklogPosition'

export const updateBacklogPosition = async (
  gameId: number,
  newPosition: number,
) => {
  return prisma.$transaction(async (tx) => {
    const game = await tx.listEntries.findFirst({
      where: {
        gameId,
        lists: {
          isMain: true,
        },
      },
    })

    if (!game) {
      throw new Error('Game not found!')
    }

    const oldPosition = game.position

    incrementGamesBacklogPosition(tx, oldPosition, newPosition)

    decrementGamesBacklogPosition(tx, oldPosition, newPosition)

    await tx.listEntries.updateMany({
      where: {
        gameId,
        lists: {
          isMain: true,
        },
      },
      data: {
        position: newPosition,
      },
    })
  })
}
