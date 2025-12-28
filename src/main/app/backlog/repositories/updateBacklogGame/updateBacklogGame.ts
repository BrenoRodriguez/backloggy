import type { GameEdit } from '../../../../../shared/types'
import { prisma } from '../../../../lib/prisma'
import { arrayToString } from '../../../../utils'

export const updateBacklogGame = async (
  id: number,
  { genres, ...gameToEdit }: Omit<GameEdit, 'id' | 'position' | 'notes'>,
) => {
  await prisma.games.update({
    where: {
      id,
    },
    data: {
      genres: arrayToString(genres),
      ...gameToEdit,
    },
  })
}
