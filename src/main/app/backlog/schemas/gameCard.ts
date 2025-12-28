import z from 'zod'
import { GAME_PLATFORMS, GAME_STATUS } from '../../../../shared/utils'
import { stringToArray } from '../../../utils'

export const GameCardSchema = z.array(
  z
    .object({
      position: z.number(),
      game: z.object({
        id: z.number(),
        name: z.string(),
        cover: z.url(),
        genres: z.string(),
        platform: z.enum(GAME_PLATFORMS),
        status: z.enum(GAME_STATUS),
        length: z.number().nullable().optional(),
        reviewScore: z.number().nullable().optional(),
        metadata1: z.string().nullable().optional(),
        metadata2: z.string().nullable().optional(),
        metadata3: z.string().nullable().optional(),
        metadata4: z.string().nullable().optional(),
        metadata5: z.string().nullable().optional(),
      }),
    })
    .transform(({ game, position }) => {
      const {
        genres,
        length,
        metadata1,
        metadata2,
        metadata3,
        metadata4,
        metadata5,
        reviewScore,
        ...otherProperties
      } = game
      return {
        ...otherProperties,
        genres: stringToArray(genres),
        length: nullToUndefined(length),
        metadata: metadata1
          ? nullToUndefined(metadata1)
          : metadata2
            ? nullToUndefined(metadata2)
            : metadata3
              ? nullToUndefined(metadata3)
              : metadata4
                ? nullToUndefined(metadata4)
                : nullToUndefined(metadata5),

        reviewScore: nullToUndefined(reviewScore),
        position,
      }
    }),
)

export type GameCardData = z.infer<typeof GameCardSchema>

function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value
}
