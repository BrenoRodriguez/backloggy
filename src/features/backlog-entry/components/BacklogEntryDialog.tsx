'use client'

import {
  backlogEntryHandle,
  type BacklogEntryPayload,
} from '@/constants/dialog-handles'
import { useSimpleToggle } from '@/hooks'
import { Dialog } from '@base-ui/react'
import { X } from 'lucide-react'
import { BacklogEntryForm } from './BacklogEntryForm'

export function BacklogEntryDialog() {
  const { isToggled, setIsToggled, toggleState } = useSimpleToggle()

  return (
    <Dialog.Root
      open={isToggled}
      onOpenChange={setIsToggled}
      handle={backlogEntryHandle}
    >
      {({ payload }) => (
        <Dialog.Portal>
          <Dialog.Backdrop className='fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-950/70'>
            <BacklogEntryDialogGuard
              toggleDialog={toggleState}
              payload={payload}
            />
          </Dialog.Backdrop>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  )
}

type GuardProps = {
  toggleDialog: () => void
  payload: BacklogEntryPayload | undefined
}

function BacklogEntryDialogGuard({ toggleDialog, payload }: GuardProps) {
  if (!payload) {
    toggleDialog()
    return
  }

  return (
    <Dialog.Popup className='w-full max-w-5xl rounded-sm border border-neutral-800 bg-neutral-950 p-5 transition-all duration-150 ease-in data-ending-style:scale-90 datastarting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0'>
      <div className='flex justify-end'>
        <Dialog.Close className='absolute cursor-pointer transition-colors duration-200 ease-in hover:text-accent-light'>
          <X size={32} />
        </Dialog.Close>
      </div>
      {
        <BacklogEntryForm
          data={payload?.data}
          mode={payload?.mode}
          toggleDialog={toggleDialog}
        />
      }
    </Dialog.Popup>
  )
}
