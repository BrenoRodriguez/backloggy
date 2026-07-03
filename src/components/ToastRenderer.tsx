'use client'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { X } from 'lucide-react'

export function ToastRenderer() {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport>
        {toasts.map((toast) => (
          <ToastPrimitive.Root key={toast.id} toast={toast}>
            <ToastPrimitive.Content>
              <ToastPrimitive.Title>
                {toast.type === 'success' ? 'Success' : 'Error'}
              </ToastPrimitive.Title>
              {toast.description && (
                <ToastPrimitive.Description>
                  {toast.description}
                </ToastPrimitive.Description>
              )}
            </ToastPrimitive.Content>
            <ToastPrimitive.Close aria-label='Close'>
              <X />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}
