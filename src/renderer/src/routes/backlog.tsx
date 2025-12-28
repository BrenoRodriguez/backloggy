import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Title } from '../components'
import { PaginationProvider } from '../features/pagination/context'
import { CARDS_PER_PAGE } from '../features/backlog/utils'
import { getBacklogPageAmount } from '../features/pagination/utils'
import { Backlog } from '../features/backlog/components'
import { PaginationNavbar } from '../features/pagination/components'

export const Route = createFileRoute('/backlog')({
  component: BacklogPage,
})

function BacklogPage() {
  return (
    <>
      <Title>My Backlog</Title>
      <main className='w-full place-items-center pt-8'>
        <PaginationProvider
          itemsPerPage={CARDS_PER_PAGE}
          queryFn={getBacklogPageAmount}
          queryKey='backlog-pagination'
        >
          <Backlog />
          <PaginationNavbar />
        </PaginationProvider>
        <Outlet />
      </main>
    </>
  )
}
