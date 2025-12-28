import type { GamePlatforms, GameStatus } from './game'

export type GameQueryOptions = {
  search?: string
  filters?: GameFilterOptions
  sort?: GameSortSettings
  currentPage: number
  itemsPerPage: number
}

export type GameFilterOptions = {
  status?: GameStatus
  genres?: string[]
  platform?: GamePlatforms
  length?: NumericRange
  metadata1?: string
  metadata2?: string
  metadata3?: string
  metadata4?: string
  metadata5?: string
  reviewScore?: number
}

export type NumericRange = {
  min?: number
  max?: number
}

export type GameSortSettings = {
  order?: GameSortOrder
  option?: GameSortOption
}

type GameSortOrder = 'asc' | 'desc'

type GameSortOption = 'position' | 'name' | 'status' | 'length' | 'reviewScore'
