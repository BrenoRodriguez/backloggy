'use server'

import { getSessionId } from '@/features/auth/actions'
import prisma from '@/lib/prisma'
import { getErrorMessage } from '@/utils'

export async function getGameBySlug(slug: string) {
  try {
    const { id } = await getSessionId()

    const game = await prisma.game.findUnique({
      where: {
        slug,
      },
      include: {
        backlogEntries: {
          where: {
            userId: id,
          },
        },
        platforms: {
          select: {
            platform: {
              select: {
                abbreviation: true,
                name: true,
                igdbId: true,
              },
            },
          },
        },
      },
    })

    const { _max } = await prisma.backlogEntry.aggregate({
      where: { userId: id },
      _max: {
        sortOrder: true,
      },
    })

    return {
      game,
      nexSortOrder: _max.sortOrder ? _max.sortOrder + 1 : 1,
      platformSuggestions: game?.platforms.map(({ platform }) => ({
        id: platform.igdbId,
        label: platform.abbreviation ?? platform.name,
      })),
    }
  } catch (error) {
    console.error(`Error fetching game ${getErrorMessage(error)}`)
  }
}
