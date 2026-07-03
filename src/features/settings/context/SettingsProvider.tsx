'use client'

import { TagSlot } from '@/generated/prisma/enums'
import { authClient } from '@/lib/auth-client'
import { toastManager } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { fetchSettings } from '../actions'
import type { Settings } from '../types'
import { SettingsContext } from './SettingsContext'

type SettingsProviderProps = {
  children: React.ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const session = authClient.useSession()

  const { data, isError } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  })

  useEffect(() => {
    if (isError && session) {
      toastManager.add({
        type: 'error',
        description: 'Error while fetching settings!',
      })
    }
  }, [isError, session])

  return (
    <SettingsContext.Provider value={formatCustomTagSettings(data)}>
      {children}
    </SettingsContext.Provider>
  )
}

function formatCustomTagSettings(
  data: Settings | undefined,
): Settings | undefined {
  if (!data) {
    return {
      genres: [],
      priorities: [],
      tagSettings: [],
    }
  }

  const order = Object.keys(TagSlot)

  return data
    ? {
        genres: data.genres,
        priorities: data.priorities,
        tagSettings: data.tagSettings.sort(
          (a, b) => order.indexOf(a.slot) - order.indexOf(b.slot),
        ),
      }
    : undefined
}
