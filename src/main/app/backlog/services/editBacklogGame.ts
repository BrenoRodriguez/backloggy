import type { GameEdit } from '../../../../shared/types'
import { ensureErrorMessage } from '../../../utils'
import {
  updateBacklogGame,
  updateBacklogGameNotes,
  updateBacklogPosition,
} from '../repositories'

export const editBacklogGame = async ({
  id,
  position,
  notes,
  ...game
}: GameEdit) => {
  try {
    await updateBacklogPosition(id, position)

    await updateBacklogGameNotes(id, notes)

    await updateBacklogGame(id, game)
  } catch (error) {
    console.error(`Error editing backlog entry: ${ensureErrorMessage(error)}`)
  }
}
