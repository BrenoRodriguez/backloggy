import { type BrowserWindow, shell } from 'electron'

export const setupExternalLinksHandler = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}
