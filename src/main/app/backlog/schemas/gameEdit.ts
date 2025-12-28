import z from 'zod'
import type { GamePlatforms, GameStatus } from '../../../../shared/types'
import { nullToUndefined, stringToArray } from '../../../utils'

export const GameEditSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    cover: z.string(),
    genres: z.string(),
    platform: z.string(),
    status: z.string(),
    length: z.number().nullable().optional(),
    reviewScore: z.number().nullable().optional(),
    metadata1: z.string().nullable().optional(),
    metadata2: z.string().nullable().optional(),
    metadata3: z.string().nullable().optional(),
    metadata4: z.string().nullable().optional(),
    metadata5: z.string().nullable().optional(),
    listsEntries: z.array(
      z.object({
        position: z.number(),
        notes: z.string().nullable().optional(),
      }),
    ),
  })
  .transform(
    ({
      genres,
      length,
      metadata1,
      metadata2,
      metadata3,
      metadata4,
      metadata5,
      listsEntries,
      status,
      reviewScore,
      platform,
      ...otherProperties
    }) => ({
      ...otherProperties,
      status: status as GameStatus,
      platform: platform as GamePlatforms,
      reviewScore: nullToUndefined(reviewScore),
      genres: stringToArray(genres),
      length: nullToUndefined(length),
      metadata1: nullToUndefined(metadata1),
      metadata2: nullToUndefined(metadata2),
      metadata3: nullToUndefined(metadata3),
      metadata4: nullToUndefined(metadata4),
      metadata5: nullToUndefined(metadata5),
      position: listsEntries[0].position,
      notes: nullToUndefined(listsEntries[0].notes),
    }),
  )

export type GameEditData = z.infer<typeof GameEditSchema>
