import type { ElectronAPI } from '@electron-toolkit/preload'
import type {
  GameCard,
  GameEdit,
  GameQueryOptions,
  Settings,
} from '../../shared/types'

declare global {
  interface Window {
    api: {
      getBacklogGames: (options: GameQueryOptions) => Promise<GameCard[]>
      getBacklogPageAmount: (itemsPerPage: number) => Promise<number>
      getBacklogGameById: (id?: number) => Promise<GameEdit | undefined>
      editBacklogGame: (game: GameEdit) => Promise<void>
      getSettings: () => Promise<Settings>
    }
    electron: ElectronAPI
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <Mark this as a moduçe>
export {}
