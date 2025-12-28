import { ipcMain } from 'electron'
import { getSettings } from '../app/settings/services'

export const handleSettingsIPC = () => {
  ipcMain.handle('get-settings', getSettings)
}
