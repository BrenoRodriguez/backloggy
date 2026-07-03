'use client'

import { Dialog } from '@base-ui/react'

export type AddBacklogEntryPayloadData = {
  id: number
  platformSuggestions: { id: number; label: string }[]
  slug: string
  name: string
  genre: string[]
  cover: string | null
  sortOrder: number
}

export type BacklogEntryPayload =
  | {
      data: AddBacklogEntryPayloadData
      mode: 'ADD'
    }
  | {
      mode: 'EDIT'
      data: {
        id: number
        platformSuggestions: { id: number; label: string }[]
        slug: string
        name: string
        genre: string[]
        cover: string | null
        sortOrder: number
      }
    }

export const backlogEntryHandle = Dialog.createHandle<BacklogEntryPayload>()
