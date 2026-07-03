import type { GameStatus, GameType } from '@/generated/prisma/enums'

export type GameListItem = {
  igdbId: number
  name: string
  slug: string
  type: GameType
  cover: string
  releaseDate: string
  status: GameStatus
  companies: {
    developers: string[]
    publishers: string[]
  }
  platforms: string[]
}
