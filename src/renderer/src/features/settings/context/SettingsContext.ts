import { createContext, useContext } from 'react'
import type { Settings } from '../../../../../shared/types'

export const SettingsContext = createContext<Settings | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}
