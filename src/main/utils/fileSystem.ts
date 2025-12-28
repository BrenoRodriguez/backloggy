import { existsSync, mkdirSync } from "node:fs"

export const ensureDocumentsFolderExists = (folderPath: string) => {
  const folderExists = !existsSync(folderPath) 
  
  if (folderExists) return

  mkdirSync(folderPath, {recursive: true})
}

