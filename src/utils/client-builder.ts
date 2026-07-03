'use client'

import type { ActionResult } from '@/types'
import { useContext } from 'react'
import { toastManager } from './toast'

type OnSuccessCallback = () => void | Promise<void>

export function createSubmitHandler<T>(
  action: (data: T) => Promise<ActionResult>,
  onSuccess?: OnSuccessCallback,
) {
  return async (data: T) => {
    const result = await action(data)

    if (!result.success) {
      return toastManager.add({
        type: 'error',
        description: result.error,
      })
    }

    toastManager.add({
      type: 'success',
      data: {
        description: result.message,
      },
    })

    if (!onSuccess) return

    await onSuccess()
  }
}

export function createUseContextHook<T>(
  context: React.Context<T>,
  contextName: string,
) {
  return () => {
    const contextResult = useContext(context)

    if (!contextResult) {
      throw new Error(`${contextName} must be used within its provider.`)
    }

    return contextResult
  }
}
