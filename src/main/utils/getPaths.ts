import { app } from "electron"
import path from "node:path"

export const getPaths = () => {
  const documentsPath = app.getPath('documents')
  const folderPath = path.join(documentsPath, 'backloggy')
  const databasePath = path.join(folderPath, 'games.db')
  
  return {
    documentsPath,
    folderPath,
    databasePath
  } 
}