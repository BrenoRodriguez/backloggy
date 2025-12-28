import z from 'zod'
import { metadataKeys } from '../../../../shared/utils'

export const DisplayedMetadataSchema = z
  .object({
    displayedMetadata: z.number().nullable().default(0),
  })
  .transform((metadata) => ({
    displayedMetadata: metadataKeys[metadata.displayedMetadata ?? 0],
  }))

export type DisplayedMetadataData = z.infer<typeof DisplayedMetadataSchema>
