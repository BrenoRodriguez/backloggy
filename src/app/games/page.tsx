import { PaginationNav } from '@/components/PaginationNav'
import { GameList } from '@/features/games/components/GameList'
import { GameSearchSettings } from '@/features/games/components/GameSearchSettings'
import { searchGames } from '../../features/games/actions/searchGames'

export type GamesSearchParams = { query?: string; page?: string; sort?: string }

type GamesPageProp = {
  searchParams: Promise<GamesSearchParams>
}

export default async function GamesPage({ searchParams }: GamesPageProp) {
  const params = await searchParams
  const games = await searchGames(params)

  return (
    <main className='flex flex-col items-center'>
      <h2 className='py-8 text-center text-3xl'>Games</h2>
      <GameSearchSettings />
      <GameList games={games?.games ?? []} />
      <PaginationNav
        currentPage={games?.currentPage ?? 1}
        pageCount={games?.pageCount ?? 1}
      />
    </main>
  )
}
