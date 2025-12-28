import { ipcMain } from 'electron'
import type { GameEdit, GameQueryOptions } from '../../shared/types'
import { editBacklogGame, getBacklogGames } from '../app/backlog/services'
import { getBacklogGameById } from '../app/backlog/services/getBacklogGameById'
import { getBacklogPageAmount } from '../app/backlog/services/getBacklogPageAmount'

export const handleBacklogIPC = () => {
  ipcMain.handle(
    'get-backlog-games',
    async (_event, queryOptions: GameQueryOptions) => {
      return getBacklogGames(queryOptions)
    },
  )
  ipcMain.handle(
    'get-backlog-page-amount',
    async (_event, itemsPerPage: number = 30) => {
      return getBacklogPageAmount(itemsPerPage)
    },
  )
  ipcMain.handle('get-backlog-game-by-id', async (_event, id?: number) => {
    return getBacklogGameById(id)
  })
  ipcMain.handle('edit-backlog-game', async (_event, game: GameEdit) => {
    return editBacklogGame(game)
  })
}
