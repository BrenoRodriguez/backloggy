import { LOWEST_PAGE_NUMBER, PAGINATION_MAX_VISIBLE_BUTTONS } from './constants'

export const calculateFirstValidVisiblePage = (currentPage: number) => {
  return Math.max(
    LOWEST_PAGE_NUMBER,
    currentPage - Math.floor(PAGINATION_MAX_VISIBLE_BUTTONS / 2),
  )
}
