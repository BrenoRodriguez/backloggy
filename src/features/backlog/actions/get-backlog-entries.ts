'use server'

import { GAME_DEFAULT_COVER_URL } from '@/constants'
import { getSessionId } from '@/features/auth/actions'
import type { BacklogEntryWhereInput } from '@/generated/prisma/models'
import prisma from '@/lib/prisma'
import type { ListResult } from '@/types'
import { getPageAmount, replaceImageSize } from '@/utils'
import type { BacklogItem, BacklogPageSearchParams } from '../types'

export async function getBacklogEntries(
  params: BacklogPageSearchParams,
): Promise<ListResult<BacklogItem>> {
  const { id } = await getSessionId()

  const where = buildBacklogEntryWhere(id, params.query)
  const select = buildBacklogEntrySelect(id)

  const [pageCount, backlogEntries] = await Promise.all([
    getPageAmount(prisma.backlogEntry, where),
    fetchBacklogEntries(where, select),
  ])

  return {
    items: backlogEntries.map(mapBacklogEntries),
    pageCount,
  }
}

function buildBacklogEntryWhere(
  userId: string,
  query: string,
): BacklogEntryWhereInput {
  return {
    userId,
    OR: [
      {
        game: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      },
      {
        customName: {
          contains: query,
          mode: 'insensitive',
        },
      },
    ],
  }
}

function buildBacklogEntrySelect(userId: string) {
  return {
    gameIGDBId: true,
    customName: true,
    completionTime: true,
    completionStatus: true,
    playtimeMinutes: true,
    customCover: true,
    status: true,
    genres: {
      select: {
        genre: {
          select: {
            name: true,
          },
        },
      },
    },
    game: {
      select: {
        cover: true,
        name: true,
        slug: true,
        status: true,
        type: true,
        releaseDate: true,
        reviews: {
          select: {
            score: true,
          },
          where: {
            user: {
              id: userId,
            },
          },
        },
      },
    },
    priority: {
      select: {
        label: true,
      },
      where: {
        userId,
      },
    },
    platform: {
      select: {
        abbreviation: true,
        name: true,
      },
    },
  }
}

export async function fetchBacklogEntries(
  where: ReturnType<typeof buildBacklogEntryWhere>,
  select: ReturnType<typeof buildBacklogEntrySelect>,
) {
  return prisma.backlogEntry.findMany({
    where,
    select,
  })
}

type QueriedBacklogEntry = Awaited<
  ReturnType<typeof fetchBacklogEntries>
>[number]

function mapBacklogEntries(backlogEntry: QueriedBacklogEntry): BacklogItem {
  return {
    game: {
      slug: backlogEntry.game.slug,
      cover: backlogEntry.game.cover
        ? `https:${replaceImageSize(backlogEntry.game.cover)}`
        : GAME_DEFAULT_COVER_URL,
      name: backlogEntry.customName ?? backlogEntry.game.name,
      status: backlogEntry.game.status ?? 'UNKNOWN',
      type: backlogEntry.game.type ?? 'UNKNOWN',
      releaseDate: backlogEntry.game.releaseDate ?? undefined,
    },
    customCover: backlogEntry.customCover ?? undefined,
    genre: backlogEntry.genres.map(({ genre }) => genre.name),
    status: backlogEntry.status,
    completionStatus: backlogEntry.completionStatus,
    playtimeMinutes: backlogEntry.playtimeMinutes ?? undefined,
    completionTime: backlogEntry.completionTime ?? undefined,
    priority: backlogEntry.priority?.label,
    reviewScore: backlogEntry.game?.reviews
      ? Number(backlogEntry.game.reviews[0]?.score)
      : undefined,
    platform: backlogEntry.platform.abbreviation ?? backlogEntry.platform.name,
  }
}
