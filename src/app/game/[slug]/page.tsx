import { BacklogEntryDialog } from '@/features/backlog-entry/components/BacklogEntryDialog'
import { getGameBySlug } from '@/repositories/games'
import { replaceImageSize } from '@/utils'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ActionButtonGroup } from './_components/ActionButtonGroup'

type GamePageProps = {
  params: Promise<{ slug: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params

  const games = await getGameBySlug(slug)

  if (!games || !games.game) {
    redirect('/games') // probably make a not found page
  }

  const { game, nexSortOrder, platformSuggestions } = games

  if (!game) {
    redirect('/games')
  }

  return (
    <>
      <main>
        <section>
          <div>
            <div className='h-50 w-40'>
              <Image
                src={game.cover ? `https:${replaceImageSize(game.cover)}` : ''}
                alt={`${game.name} game cover.`}
                width={156}
                height={211}
                quality={100}
                className='size-full object-cover'
              />
            </div>
            <ActionButtonGroup
              defaultHasBacklogEntry={game.backlogEntries.length > 0}
              addBacklogEntryPayload={{
                name: game.name,
                cover: game.cover,
                genre: game.genres,
                id: game.igdbId,
                platformSuggestions: platformSuggestions ?? [],
                sortOrder: nexSortOrder,
                slug,
              }}
            />
          </div>
        </section>
        <div>{game.summary}</div>
        {game.name}
      </main>
      <BacklogEntryDialog />
    </>
  )
}
