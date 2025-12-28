import {
  GAME_PLATFORM_SUGGESTIONS,
  GAME_STATUS_SUGGESTIONS,
} from '../../renderer/src/constants'
import type { MetadataKeys } from '../types'

export const GAME_STATUS = [...GAME_STATUS_SUGGESTIONS] as const

export const GAME_PLATFORMS = [...GAME_PLATFORM_SUGGESTIONS] as const

export const metadataKeys: MetadataKeys[] = [
  'metadata1',
  'metadata2',
  'metadata3',
  'metadata4',
  'metadata5',
]
