'use client'

import {
  type AddBacklogEntryPayloadData,
  backlogEntryHandle,
} from '@/constants/dialog-handles'
import { Dialog } from '@base-ui/react'
import { useActionButtonGroup } from '../_hooks'

type ActionButtonGroupProps = {
  defaultHasBacklogEntry: boolean
  addBacklogEntryPayload: AddBacklogEntryPayloadData
}

export function ActionButtonGroup({
  defaultHasBacklogEntry,
  addBacklogEntryPayload,
}: ActionButtonGroupProps) {
  const { hasBacklogEntry, toggleHasBacklogEntry } = useActionButtonGroup(
    defaultHasBacklogEntry,
  )

  return (
    <div>
      {hasBacklogEntry ? (
        <>
          <Dialog.Trigger
            handle={backlogEntryHandle}
            payload={{ mode: 'EDIT', data: addBacklogEntryPayload }}
          >
            Edit Backlog Entry
          </Dialog.Trigger>
          <button type='button'>Remove From Backlog</button>
        </>
      ) : (
        <Dialog.Trigger
          handle={backlogEntryHandle}
          payload={{
            mode: 'ADD',
            data: addBacklogEntryPayload,
          }}
        >
          Add To Backlog
        </Dialog.Trigger>
      )}
      <button type='button'> Add To Wishlist</button>
      <button type='button'>Add To List</button>
      <button type='button'> Review</button>
      <button type='button'>More Drawer</button>
    </div>
  )
}
