import { ipcRenderer } from 'electron'
import type { GameEdit, GameQueryOptions } from '../shared/types'

export const api = {
  getBacklogGames: (queryOptions: GameQueryOptions) =>
    ipcRenderer.invoke('get-backlog-games', queryOptions),
  getBacklogPageAmount: (itemsPerPage: number) =>
    ipcRenderer.invoke('get-backlog-page-amount', itemsPerPage),
  getBacklogGameById: (id?: number) =>
    ipcRenderer.invoke('get-backlog-game-by-id', id),
  editBacklogGame: (game: GameEdit) =>
    ipcRenderer.invoke('edit-backlog-game', game),
  getSettings: () => ipcRenderer.invoke('get-settings'),
}
