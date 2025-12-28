import { useQuery } from '@tanstack/react-query'
import { SettingsContext } from './SettingsContext'
import { getSettings } from '../utils'

type SettingsProviderProps = {
  children: React.ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { data } = useQuery({
    queryKey: ['get-settings'],
    queryFn: getSettings,
  })

  return (
    <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
  )
}
