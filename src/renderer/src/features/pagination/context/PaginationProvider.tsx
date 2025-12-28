import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { generatePageNumbersForNavbar } from '../utils'
import { PaginationContext } from './PaginationContext'

type PaginationProviderProps = {
  children: React.ReactNode
  itemsPerPage: number
  queryKey: string
  queryFn: (itemsPerPage: number) => Promise<number>
}

export const PaginationProvider = ({
  children,
  itemsPerPage,
  queryKey,
  queryFn,
}: PaginationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: totalPages } = useQuery({
    queryKey: [queryKey, itemsPerPage],
    queryFn: () => queryFn(itemsPerPage),
  })

  const navbarPageNumbers = useMemo(
    () => generatePageNumbersForNavbar(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage <= 1) return
    goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (totalPages && currentPage >= totalPages) return
    goToPage(currentPage + 1)
  }

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        navbarPageNumbers,
        totalPages: totalPages ?? 0,
        goToPage,
        goToPreviousPage,
        goToNextPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}
