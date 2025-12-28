import type { TransactionType } from '../../types/transaction'

export const decrementGamesBacklogPosition = async (
  tx: TransactionType,
  oldPosition: number,
  newPosition: number,
) => {
  if (newPosition <= oldPosition) return

  await tx.listEntries.updateMany({
    where: {
      lists: {
        isMain: true,
      },
      position: {
        gt: oldPosition,
        lte: newPosition,
      },
    },
    data: {
      position: { decrement: 1 },
    },
  })
}
