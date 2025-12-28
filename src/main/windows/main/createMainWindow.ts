import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import icon from '../../../../resources/icon.png'

export const createMainWindow = (): BrowserWindow => {
  return new BrowserWindow({
    width: 900,
    height: 670,
    darkTheme: true,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })
}
