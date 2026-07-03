'use server'

import { ProtectedPage } from '@/features/auth/components'
import { getBacklogEntries } from '@/features/backlog/actions/get-backlog-entries'
import {
  Backlog,
  BacklogNav,
  BacklogSearchSettings,
} from '@/features/backlog/components'
import type { BacklogPageSearchParams } from '@/features/backlog/types'

type BacklogPageProps = {
  searchParams: Promise<BacklogPageSearchParams>
}

export default async function BacklogPage({ searchParams }: BacklogPageProps) {
  const { page = '1', query = '', sort = 'asc' } = await searchParams
  const { items: backlogEntries, pageCount } = await getBacklogEntries({
    page,
    query,
    sort,
  })

  return (
    <ProtectedPage>
      <main>
        <h2 className='py-8 text-center text-3xl'>Backlog</h2>
        <BacklogSearchSettings />
        <Backlog backlogEntries={backlogEntries} />
        <BacklogNav />
      </main>
    </ProtectedPage>
  )
}
