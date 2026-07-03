'use server'

import prisma from '@/lib/prisma'
import type { PrioritySettings, TagSettings } from '../types'

const TAG_SLOTS = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'] as const

const PRIORITY_LEVELS = [
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
  'TEN',
] as const

export async function createSettings(userId: string) {
  const defaultTags = buildDefaultTagSettings(userId)
  const defaultPriorities = buildDefaultPrioritySettings(userId)

  await prisma.$transaction([
    prisma.settings.create({
      data: {
        userId,
      },
    }),
    prisma.tagSettings.createMany({
      data: defaultTags,
    }),
    prisma.priority.createMany({
      data: defaultPriorities,
    }),
  ])
}

function buildDefaultTagSettings(userId: string): (Omit<TagSettings, 'id'> & {
  userId: string
})[] {
  return TAG_SLOTS.map((tagSlot, index) => ({
    userId: userId,
    active: index === 0,
    slot: tagSlot,
    type: 'TEXT',
    label: `Custom Tag ${index + 1}`,
    presets: [],
  }))
}

function buildDefaultPrioritySettings(userId: string): (Omit<
  PrioritySettings,
  'id'
> & {
  userId: string
})[] {
  return PRIORITY_LEVELS.map((priorityLevel, index) => ({
    userId: userId,
    label: `Priority ${index + 1}`,
    level: priorityLevel,
  }))
}
