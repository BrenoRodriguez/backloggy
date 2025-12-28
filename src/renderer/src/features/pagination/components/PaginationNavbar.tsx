import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { usePagination } from '../context/PaginationContext'
import { PaginationNavItem } from './PaginationNavItem'

export const PaginationNavbar = () => {
  const {
    currentPage,
    totalPages,
    navbarPageNumbers,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  } = usePagination()
  return (
    <section className='flex items-center justify-center gap-2 py-4'>
      <PaginationNavItem
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft strokeWidth={1.5} />
      </PaginationNavItem>
      <PaginationNavItem
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </PaginationNavItem>
      {navbarPageNumbers.map((pageNumber) => (
        <PaginationNavItem
          key={`PaginationNav${totalPages}${pageNumber}`}
          onClick={() => goToPage(pageNumber)}
          isPageActive={currentPage === pageNumber}
        >
          {pageNumber}
        </PaginationNavItem>
      ))}
      <PaginationNavItem
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </PaginationNavItem>
      <PaginationNavItem
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight strokeWidth={1.5} />
      </PaginationNavItem>
    </section>
  )
}
