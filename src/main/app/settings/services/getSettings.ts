import { fetchSettings } from '../repositories'

export const getSettings = async () => {
  return await fetchSettings()
}
