import type { GAME_PLATFORMS, GAME_STATUS } from '@/constants'

export type GameStatus = (typeof GAME_STATUS)[number]

export type GamePlatforms = (typeof GAME_PLATFORMS)[number]

export type Game = {
  id: number
  name: string
  cover: string
  genres: string[]
  platform: GamePlatforms
  status: GameStatus
  length?: number
}
