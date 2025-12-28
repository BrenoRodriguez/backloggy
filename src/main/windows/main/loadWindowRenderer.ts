import { is } from '@electron-toolkit/utils'
import type { BrowserWindow } from 'electron'
import { join } from 'node:path'

export const loadWindowRenderer = (mainWindow: BrowserWindow) => {
  const isDev = is.dev
  const rendererURL = process.env['ELECTRON_RENDERER_URL']

  if (isDev && rendererURL) {
    mainWindow.loadURL(rendererURL)
    return
  }

  mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}
