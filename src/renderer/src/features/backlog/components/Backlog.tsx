import { usePagination } from '../../pagination/context/PaginationContext'
import { BacklogProvider } from '../context'
import { BacklogGames } from './BacklogGames'

export const Backlog = () => {
  const { currentPage } = usePagination()
  return (
    <BacklogProvider currentPage={currentPage}>
      <BacklogGames />
    </BacklogProvider>
  )
}
