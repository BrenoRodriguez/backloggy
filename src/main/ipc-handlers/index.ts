import { handleBacklogIPC } from './backlog'
import { handleSettingsIPC } from './settings'

export const handleIPC = () => {
  handleBacklogIPC()
  handleSettingsIPC()
}
