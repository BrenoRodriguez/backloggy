import { Title } from '../components'
import { Backlog, EditGameModal } from '../features/backlog/components'
import { EditGameProvider } from '../features/backlog/context'
import { CARDS_PER_PAGE } from '../features/backlog/utils'
import { PaginationNavbar } from '../features/pagination/components'
import { PaginationProvider } from '../features/pagination/context'
import { getBacklogPageAmount } from '../features/pagination/utils'

export const BacklogPage = () => {
  return (
    <>
      <Title>My Backlog</Title>
      <main className='w-full place-items-center pt-8'>
        <EditGameProvider>
          <PaginationProvider
            itemsPerPage={CARDS_PER_PAGE}
            queryFn={getBacklogPageAmount}
            queryKey='backlog-pagination'
          >
            <Backlog />
            <PaginationNavbar />
          </PaginationProvider>
          <EditGameModal />
        </EditGameProvider>
      </main>
    </>
  )
}
