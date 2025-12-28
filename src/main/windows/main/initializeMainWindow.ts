import { createMainWindow } from './createMainWindow'
import { loadWindowRenderer } from './loadWindowRenderer'
import { setupExternalLinksHandler } from './setupExternalLinksHandler'
import { showMainWindow } from './showMainWindow'

export const initializeMainWindow = (): void => {
  const mainWindow = createMainWindow()

  showMainWindow(mainWindow)
  setupExternalLinksHandler(mainWindow)
  loadWindowRenderer(mainWindow)
}
