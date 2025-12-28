import type { BrowserWindow } from 'electron'

export const showMainWindow = (mainWindow: BrowserWindow) => {
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}
