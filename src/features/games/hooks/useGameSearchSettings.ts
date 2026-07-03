'use client'

import { useRouter } from 'next/navigation'
import type { GameSearchSettingsData } from '../schema'

export function useGameSearchSettings() {
  const router = useRouter()

  function onSubmit(data: GameSearchSettingsData) {
    const searchParams = new URLSearchParams(data)

    router.push(`games?${searchParams.toString()}`)
  }

  return { onSubmit }
}
