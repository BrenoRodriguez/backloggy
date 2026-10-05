import {
  GAME_PLATFORM_SUGGESTIONS,
  GAME_STATUS_SUGGESTIONS,
} from './suggestions'

export const GAME_STATUS = [...GAME_STATUS_SUGGESTIONS] as const

export const GAME_PLATFORMS = [...GAME_PLATFORM_SUGGESTIONS] as const

export const GAME_DEFAULT_COVER_URL = '../../../public/temporary-no-cover.png' // move this out of here
