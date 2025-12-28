import z from 'zod'
import { GAME_PLATFORMS, GAME_STATUS } from '../../../../shared/utils'

const metadataField = z.string().optional()

const numberField = z.coerce.number().refine((val) => !Number.isNaN(val), {
  message: 'Field must be a number!',
})

export const EditGameSchema = z.object({
  name: z.string(),
  cover: z.string(),
  genres: z.array(z.string()),
  platform: z.literal(GAME_PLATFORMS),
  status: z.literal(GAME_STATUS),
  position: numberField,
  length: z.optional(numberField),
  reviewScore: z.optional(numberField),
  metadata1: metadataField,
  metadata2: metadataField,
  metadata3: metadataField,
  metadata4: metadataField,
  metadata5: metadataField,
  notes: z.string().optional(),
})

export type EditGameData = z.infer<typeof EditGameSchema>
