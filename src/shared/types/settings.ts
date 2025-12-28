export type MetadataKeys = `metadata${1 | 2 | 3 | 4 | 5}`

export type MetadataSettings = {
  status: boolean
  label: string
  presets: string[]
}
export type Settings = {
  displayedMetadata: number
  metadata1: {
    label: string
    presets: string[]
  }
  metadata2: MetadataSettings
  metadata3: MetadataSettings
  metadata4: MetadataSettings
  metadata5: MetadataSettings
}
