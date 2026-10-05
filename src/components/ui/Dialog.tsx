'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react'
import { X } from 'lucide-react'

type DialogProps = {
  children: React.ReactNode
  handle: DialogPrimitive.Handle<unknown>
  title: string
  open: boolean
  setOpen: () => void
}

export function Dialog({
  children,
  title,
  open,
  setOpen,
  handle,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen} handle={handle}>
      {({ payload }) => (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className='fixed top-0 left-0 flex h-full w-full items-center justify-center bg-neutral-950/70'>
            <DialogPrimitive.Popup className='rounded-sm border border-neutral-800 bg-neutral-950 p-5 transition-all duration-150 ease-in data-ending-style:scale-90 datastarting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0'>
              <div className='flex items-start justify-between pb-8 font-medium text-2xl uppercase'>
                <DialogPrimitive.Title className=''>
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close>
                  <X
                    size={32}
                    className='cursor-pointer transition-colors duration-200 ease-in hover:text-accent-light'
                  />
                </DialogPrimitive.Close>
              </div>
              {children}
            </DialogPrimitive.Popup>
          </DialogPrimitive.Backdrop>
        </DialogPrimitive.Portal>
      )}
    </DialogPrimitive.Root>
  )
}
