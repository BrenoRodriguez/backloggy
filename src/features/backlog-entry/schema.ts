import {
  BacklogCompletionStatus,
  BacklogEntryStatus,
  PriorityLevel,
} from '@/generated/prisma/enums'
import z from 'zod'

export const BacklogEntrySchema = z.object({
  customName: z.optional(z.string().max(100)),
  sortOrder: z.coerce.number(),
  platformId: z.coerce.number(),
  customGenres: z.array(z.number()).optional(),
  priority: z
    .union([z.literal(''), z.enum(PriorityLevel)])
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  status: z
    .optional(
      z.union([
        z.enum(BacklogEntryStatus),
        z.array(z.enum(BacklogEntryStatus)),
      ]),
    )
    .transform((value) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? value[0] : 'BACKLOG'
      }
      return value ?? 'BACKLOG'
    }),
  completionStatus: z
    .union([z.literal(''), z.enum(BacklogCompletionStatus)])
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  startDate: z.optional(z.coerce.date()),
  endDate: z.optional(z.coerce.date()),
  customCover: z.optional(z.url()),
  completionTime: z.optional(z.coerce.number()),
  playtimeMinutes: z.optional(z.coerce.number()),
  customTag1: z.optional(z.string()),
  customTag2: z.optional(z.string()),
  customTag3: z.optional(z.string()),
  customTag4: z.optional(z.string()),
  customTag5: z.optional(z.string()),
})

export type BacklogEntryData = z.infer<typeof BacklogEntrySchema>

export type BacklogEntryInput = z.input<typeof BacklogEntrySchema>
