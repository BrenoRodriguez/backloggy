import type { Prisma } from '../../../../../../generated/prisma/client'
import type { GameFilterOptions } from '../../../../../shared/types'

export const createBacklogWhere = (
  filters?: GameFilterOptions,
  search?: string,
) => {
  if (!filters && !search) return undefined

  const where: Prisma.GamesWhereInput = {}

  const { length, genres, ...otherProperties } = filters ?? {}

  if (search) {
    where.name = { contains: search }
  }

  for (const [key, value] of Object.entries(otherProperties)) {
    if (value !== undefined) {
      where[key] = value
    }
  }

  if (genres?.length) {
    where.AND = genres.map((genre) => ({ genres: { contains: `,${genre},` } }))
  }

  const hasMin = length?.min !== undefined
  const hasMax = length?.max !== undefined

  if (length && (hasMin || hasMax)) {
    where.length = {
      ...(hasMin && { gte: length.min }),
      ...(hasMax && { lte: length.max }),
    }
  }

  return where
}
