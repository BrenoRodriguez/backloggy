import { calculateFirstValidVisiblePage } from './calculateFirstValidVisiblePage'
import { calculateLastValidVisiblePage } from './calculateLastValidVisiblePage'

export const generatePageNumbersForNavbar = (
  currentPage: number,
  totalPages: number = 1,
): number[] => {
  const firstPageNumber = calculateFirstValidVisiblePage(currentPage)
  const lastPageNumber = calculateLastValidVisiblePage(
    totalPages,
    firstPageNumber,
  )

  return Array.from(
    { length: lastPageNumber - firstPageNumber + 1 },
    (_, i) => firstPageNumber + i,
  )
}
