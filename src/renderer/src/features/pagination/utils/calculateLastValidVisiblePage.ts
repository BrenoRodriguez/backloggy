import { PAGINATION_MAX_VISIBLE_BUTTONS } from './constants'

export const calculateLastValidVisiblePage = (
  totalPages: number,
  firstPageNumber: number,
) => {
  return Math.min(
    totalPages,
    firstPageNumber + PAGINATION_MAX_VISIBLE_BUTTONS - 1,
  )
}
