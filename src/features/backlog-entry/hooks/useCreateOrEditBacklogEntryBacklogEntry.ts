'use client'

import { createOrEditBacklogEntry } from '../actions/editOrCreateBacklogEntry'
import type { BacklogEntryInput } from '../schema'

export function useCreateOrEditBacklogEntry(
  gameId: number,
  closeDialog: () => void,
  slug: string,
) {
  async function onSubmit(data: BacklogEntryInput) {
    try {
      await createOrEditBacklogEntry(data, gameId)

      closeDialog()
      // revalidate(`/games/${slug}`)
      // now I need to reset the buttons in the game page to edit after creating only
    } catch (error) {
      console.error(error)
    }
  }

  return { onSubmit }
}
