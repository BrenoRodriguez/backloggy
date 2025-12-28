import type { GameEdit } from '../../../../../shared/types'

export const editBacklogGame = async (game: GameEdit) => {
  return await window.api.editBacklogGame(game)
}
