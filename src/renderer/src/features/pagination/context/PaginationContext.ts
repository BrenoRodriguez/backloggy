import { createContext, useContext } from 'react'

type PaginationContextItems = {
  currentPage: number
  navbarPageNumbers: number[]
  totalPages: number
  goToPage: (page: number) => void
  goToPreviousPage: () => void
  goToNextPage: () => void
}

export const PaginationContext = createContext<
  PaginationContextItems | undefined
>(undefined)

export const usePagination = () => {
  const context = useContext(PaginationContext)

  if (!context) {
    throw new Error('PaginationContext')
  }

  return context
}
