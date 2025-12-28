import z from 'zod'
import { stringToArray } from '../../../utils'
import { MAX_DISPLAYED_METADATA } from '../constants'

export const SettingsSchema = z
  .object({
    id: z.number(),
    displayedMetadata: z.number(),
    metadata1Label: z.string(),
    metadata1Presets: z.string().nullable(),
    metadata2Status: z.boolean(),
    metadata2Label: z.string(),
    metadata2Presets: z.string().nullable(),
    metadata3Status: z.boolean(),
    metadata3Label: z.string(),
    metadata3Presets: z.string().nullable(),
    metadata4Status: z.boolean(),
    metadata4Label: z.string(),
    metadata4Presets: z.string().nullable(),
    metadata5Status: z.boolean(),
    metadata5Label: z.string(),
    metadata5Presets: z.string().nullable(),
  })
  .transform(
    ({
      displayedMetadata,
      metadata1Label,
      metadata1Presets,
      metadata2Label,
      metadata2Presets,
      metadata2Status,
      metadata3Label,
      metadata3Presets,
      metadata3Status,
      metadata4Label,
      metadata4Presets,
      metadata4Status,
      metadata5Label,
      metadata5Presets,
      metadata5Status,
    }) => {
      return {
        displayedMetadata:
          displayedMetadata <= MAX_DISPLAYED_METADATA ? displayedMetadata : 0,
        metadata1: {
          label: metadata1Label,
          presets: metadata1Presets
            ? stringToArray(metadata1Presets)
            : undefined,
        },
        metadata2: {
          status: metadata2Status,
          label: metadata2Label,
          presets: metadata2Presets
            ? stringToArray(metadata2Presets)
            : undefined,
        },
        metadata3: {
          status: metadata3Status,
          label: metadata3Label,
          presets: metadata3Presets
            ? stringToArray(metadata3Presets)
            : undefined,
        },
        metadata4: {
          status: metadata4Status,
          label: metadata4Label,
          presets: metadata4Presets
            ? stringToArray(metadata4Presets)
            : undefined,
        },
        metadata5: {
          status: metadata5Status,
          label: metadata5Label,
          presets: metadata5Presets
            ? stringToArray(metadata5Presets)
            : undefined,
        },
      }
    },
  )

export type SettingsData = z.infer<typeof SettingsSchema>
