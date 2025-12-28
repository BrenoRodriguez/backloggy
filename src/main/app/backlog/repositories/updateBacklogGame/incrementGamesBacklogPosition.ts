import type { TransactionType } from '../../types/transaction'

export const incrementGamesBacklogPosition = async (
  tx: TransactionType,
  oldPosition: number,
  newPosition: number,
) => {
  if (newPosition >= oldPosition) return

  await tx.listEntries.updateMany({
    where: {
      lists: {
        isMain: true,
      },
      position: {
        gte: newPosition,
        lt: oldPosition,
      },
    },
    data: {
      position: { increment: 1 },
    },
  })
}
