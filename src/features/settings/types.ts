import type { PriorityLevel, TagSlot, TagType } from '@/generated/prisma/enums'

export type Settings = {
  genres: {
    name: string
    id: number
  }[]
  priorities: PrioritySettings[]
  tagSettings: TagSettings[]
}

export type TagSettings = {
  type: TagType
  label: string
  slot: TagSlot
  id: number
  active: boolean
  presets: string[]
}

export type PrioritySettings = {
  label: string
  id: number
  level: PriorityLevel
}
