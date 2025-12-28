import { app } from 'electron'

export const exitOnAllWindowsClose = (): void => {
  app.on('window-all-closed', () => {
    const isMacOS = process.platform === 'darwin'

    if (isMacOS) return

    app.quit()
  })
}
