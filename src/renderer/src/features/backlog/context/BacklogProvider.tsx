import { useQuery } from '@tanstack/react-query'
import { getBacklogGames } from '../utils'
import { BacklogContext } from './BacklogContext'

type BacklogProviderProps = {
  children: React.ReactNode
  currentPage: number
}

export const BacklogProvider = ({
  children,
  currentPage,
}: BacklogProviderProps) => {
  const { data: games } = useQuery({
    queryKey: ['backlog-games', currentPage],
    queryFn: () => getBacklogGames({ currentPage, itemsPerPage: 30 }),
  })

  return (
    <BacklogContext.Provider value={games || []}>
      {children}
    </BacklogContext.Provider>
  )
}
