'use client'

import type { ToggleOption } from '@/components'
import { BacklogCompletionStatus } from '@/generated/prisma/enums'
import { BooksIcon, GiftIcon, JoystickIcon } from '@phosphor-icons/react'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'

export const BACKLOG_ENTRY_STATUS_OPTIONS: ToggleOption[] = [
  {
    ariaLabel: 'Backlog',
    label: (
      <>
        <BooksIcon size={24} weight='fill' />
        Backlog
      </>
    ),
    value: 'BACKLOG',
  },
  {
    ariaLabel: 'Playing',
    label: (
      <>
        <JoystickIcon size={24} weight='fill' /> Playing
      </>
    ),
    value: 'PLAYING',
  },
  {
    ariaLabel: 'Played',
    label: (
      <>
        <CheckCircleIcon size={24} weight='fill' />
        Played
      </>
    ),
    value: 'PLAYED',
  },
  {
    ariaLabel: 'Wishlist',
    label: (
      <>
        <GiftIcon size={24} weight='fill' />
        Wishlist
      </>
    ),
    value: 'WISHLIST',
  },
]

export const COMPLETION_STATUS_OPTIONS = [
  {
    label: 'Unfinished',
    value: BacklogCompletionStatus.UNFINISHED,
  },
  { label: 'Beaten', value: BacklogCompletionStatus.BEATEN },
  { label: 'Completed', value: BacklogCompletionStatus.COMPLETED },
  { label: 'Dropped', value: BacklogCompletionStatus.DROPPED },
]
