import type {
  BacklogCompletionStatus,
  BacklogEntryStatus,
  GameStatus,
  GameType,
} from '@/generated/prisma/enums'

export type BacklogPageSearchParams = {
  query: string
  page: string
  sort: string
}

export type BacklogItem = {
  game: {
    slug: string
    name: string
    type: GameType | 'UNKNOWN'
    status: GameStatus
    cover: string
    releaseDate?: Date
  }
  customCover?: string
  genre: string[]
  status: BacklogEntryStatus
  completionStatus: BacklogCompletionStatus
  playtimeMinutes?: number
  completionTime?: number
  priority?: string
  reviewScore?: number
  platform: string
}
