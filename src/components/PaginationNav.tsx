'use client'

import { usePaginationNav } from '@/hooks/usePaginationNav'
import { getVisiblePageNumbers } from '@/utils/pagination-numbers'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import type React from 'react'
import type { ComponentProps } from 'react'

type PaginationNavProps = {
  pageCount: number
  currentPage: number
}

export function PaginationNav({ pageCount, currentPage }: PaginationNavProps) {
  const visiblePageNumbers = getVisiblePageNumbers(pageCount, currentPage)
  const { updateUrlParamsPage } = usePaginationNav()

  return (
    <nav className='flex gap-3 py-8'>
      <PaginationNavItem
        label={<ChevronsLeft />}
        onClick={updateUrlParamsPage(1)}
        disabled={currentPage === 1}
      />
      <PaginationNavItem
        label={<ChevronLeft />}
        onClick={updateUrlParamsPage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {visiblePageNumbers.map((pageNumber) => (
        <PaginationNavItem
          key={`${pageCount}${pageNumber}`}
          label={pageNumber}
          onClick={updateUrlParamsPage(pageNumber)}
          data-active={pageNumber === currentPage ? true : null}
        />
      ))}

      <PaginationNavItem
        label={<ChevronRight />}
        onClick={updateUrlParamsPage(currentPage + 1)}
        disabled={currentPage === pageCount}
      />
      <PaginationNavItem
        label={<ChevronsRight />}
        onClick={updateUrlParamsPage(pageCount)}
        disabled={currentPage === pageCount}
      />
    </nav>
  )
}

type PaginationNavItemProps = {
  label: React.ReactNode
} & ComponentProps<'button'>

function PaginationNavItem({ label, ...props }: PaginationNavItemProps) {
  return (
    <button
      {...props}
      className='flex size-13 cursor-pointer items-center justify-center rounded-sm border border-neutral-800 bg-foreground text-lg transition-all duration-200 ease-in hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-foreground disabled:opacity-50 data-active:bg-accent-normal data-active:hover:bg-accent-light'
    >
      {label}
    </button>
  )
}

// disable click when active
