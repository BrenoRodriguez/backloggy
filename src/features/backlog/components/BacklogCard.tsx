import type {
  BacklogCompletionStatus,
  BacklogEntryStatus,
  GameStatus,
} from '@/generated/prisma/enums'

import { CardTitle } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import type { BacklogItem } from '../types'

type BacklogCardProps = {
  backlogEntry: BacklogItem
}

export function BacklogCard({ backlogEntry }: BacklogCardProps) {
  return (
    <Link
      href={`/game/${backlogEntry.game.slug}`}
      className='flex h-75 w-102.5 rounded-r-sm border border-stone-900 bg-foreground sm:w-full sm:max-w-120'
    >
      <BacklogEntryCover backlogEntry={backlogEntry} />
      <div className='flex w-fit flex-1 flex-col items-center text-center'>
        <CardTitle name={backlogEntry.game.name} />
        <BacklogEntryContent backlogEntry={backlogEntry} />
      </div>
    </Link>
  )
}

function BacklogEntryCover({ backlogEntry }: BacklogCardProps) {
  return (
    <div className='h-75 w-50'>
      <Image
        src={backlogEntry.customCover ?? backlogEntry.game.cover}
        alt={`${backlogEntry.game.name} cover art`}
        height={300}
        width={200}
        className='size-full rounded-l-sm object-cover'
      />
    </div>
  )
}

function BacklogEntryContent({ backlogEntry }: BacklogCardProps) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-between py-5 text-white/90'>
      <div>{backlogEntry.genre.join(', ')}.</div>
      <div>{formatBacklogCardStatus(backlogEntry)}</div>
      <div>{backlogEntry.priority}</div>
      <div>
        {backlogEntry.completionTime ? backlogEntry.completionTime / 60 : 0}h
      </div>
      <div>{backlogEntry.platform}</div>
    </div>
  )
}

function formatBacklogCardStatus(backlogEntry: BacklogItem) {
  const currentDate = new Date()

  if (
    !backlogEntry.game.releaseDate ||
    currentDate < backlogEntry.game.releaseDate
  ) {
    return 'Not Released'
  }

  const backlogStatusLabel = formatByBacklogEntryStatus(backlogEntry.status)

  if (backlogStatusLabel) {
    return backlogStatusLabel
  }

  const completionStatusLabel = formatByCompletionStatus(
    backlogEntry.completionStatus,
  )

  if (completionStatusLabel) {
    return completionStatusLabel
  }

  const gameStatusLabel = formatByGameStatus(backlogEntry.game.status)

  if (gameStatusLabel) {
    return gameStatusLabel
  }

  // later implement Language Locked//Region Locked by looking the allowed languages of

  return 'Backlog'
}

function formatByBacklogEntryStatus(
  backlogEntryStatus: BacklogEntryStatus,
): string | undefined {
  const statusLabel = {
    BACKLOG: undefined,
    PLAYED: undefined,
    PLAYING: 'Playing',
    WISHLIST: 'Whishlist',
  } satisfies Record<BacklogEntryStatus, string | undefined>

  return statusLabel[backlogEntryStatus]
}

function formatByCompletionStatus(
  completionStatus: BacklogCompletionStatus,
): string | undefined {
  const statusLabel = {
    UNFINISHED: undefined,
    BEATEN: 'Beaten',
    COMPLETED: '100%',
    DROPPED: 'Dropped',
  } satisfies Record<BacklogCompletionStatus, string | undefined>

  return statusLabel[completionStatus]
}

function formatByGameStatus(gameStatus: GameStatus): string | undefined {
  const statusCategory = {
    ALPHA: 'Not Released',
    BETA: 'Not Released',
    RUMORED: 'Not Released',
    UNKNOWN: undefined,
    DELISTED: undefined,
    OFFLINE: undefined,
    RELEASED: undefined,
    EARLY_ACCESS: 'Early Access',
    CANCELLED: 'Cancelled',
  } satisfies Record<GameStatus, string | undefined>

  return statusCategory[gameStatus]
}
