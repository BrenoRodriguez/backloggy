'use server'

import type { GamesSearchParams } from '@/app/games/page'
import type {
  CompanyGameRelationType,
  GameStatus,
  GameType,
} from '@/generated/prisma/enums'
import type { GameWhereInput } from '@/generated/prisma/models'
import prisma from '@/lib/prisma'
import { getPageAmount } from '@/utils'
import { GAME_SEARCH_CARD_LIMIT } from '../constants/game-list'
import type { GameListItem } from '../types'

type SearchGamesReturn = {
  games: GameListItem[]
  pageCount: number
  currentPage: number
  query: string
}

export async function searchGames(
  params: GamesSearchParams,
): Promise<SearchGamesReturn | undefined> {
  try {
    const { page = '1', query = '', sort = 'asc' } = params

    const { skip, take, currentPage } = createPaginationProperties(Number(page))
    // buildWhere
    // make a const with the selected items and move from here
    const where: GameWhereInput = {
      name: { contains: query, mode: 'insensitive' },

      type: {
        notIn: [
          'EXPANDED_GAME',
          'BUNDLE',
          'UPDATE',
          'PORT',
          'FORK',
          'PACK_ADDON',
          'SEASON',
        ],
      },
    }

    const [pageCount, games] = await Promise.all([
      getPageAmount(prisma.game, where),
      fetchSearchedGames(where, skip, take),
    ])

    return {
      games: mapSearchedGames(games),
      pageCount,
      currentPage,
      query,
    }
  } catch (error) {
    console.error(`Could not find games: ${error}`)
    return undefined
  }
}

async function fetchSearchedGames(
  where: GameWhereInput,
  skip: number,
  take: number,
) {
  return prisma.game.findMany({
    where,
    skip,
    take,
    orderBy: { name: 'asc' },
    select: {
      cover: true,
      type: true,
      platforms: {
        select: {
          platform: {
            select: {
              abbreviation: true,
            },
          },
        },
      },
      slug: true,
      igdbId: true,
      companies: {
        select: {
          company: {
            select: {
              name: true,
            },
          },
          type: true,
        },
      },
      name: true,
      releaseDate: true,
      status: true,
    },
  })
}

function createPaginationProperties(page: number) {
  const skip = (page - 1) * GAME_SEARCH_CARD_LIMIT

  return {
    take: GAME_SEARCH_CARD_LIMIT,
    skip,
    currentPage: page,
  }
}

function mapSearchedGames(games: QueriedGame[]): GameListItem[] {
  return games.map((game) => {
    return {
      igdbId: game.igdbId,
      slug: game.slug,
      type: game.type ?? 'MAIN_GAME',
      cover: game.cover ?? '', // 'linkfordefaultcover'
      releaseDate: game.releaseDate?.getFullYear().toString() ?? '',
      status: game.status ?? 'RELEASED',
      platforms: game.platforms.flatMap(
        ({ platform }) => platform.abbreviation ?? '',
      ),
      companies: mapPublishersAndDevelopers(game.companies),
      name: game.name,
    }
  })
}

function mapPublishersAndDevelopers(
  companies: QueriedGame['companies'],
): GameListItem['companies'] {
  const developers = companies.filter((company) => {
    return company.type === 'DEVELOPED'
  })

  const publishers = companies.filter((company) => {
    return company.type === 'PUBLISHED'
  })

  return {
    developers: developers.flatMap(({ company }) => company.name),
    publishers: publishers.flatMap(({ company }) => company.name),
  }
}

type QueriedGame = {
  type: GameType | null
  name: string
  igdbId: number
  cover: string | null
  slug: string
  releaseDate: Date | null
  status: GameStatus | null
  companies: {
    type: CompanyGameRelationType
    company: {
      name: string
    }
  }[]
  platforms: {
    platform: {
      abbreviation: string | null
    }
  }[]
}
