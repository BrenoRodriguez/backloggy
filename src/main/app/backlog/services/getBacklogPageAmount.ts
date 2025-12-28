import { fetchBacklogGameCount } from '../repositories'

export const getBacklogPageAmount = async (itemsPerPage: number = 30) => {
  const totalItemCount = await fetchBacklogGameCount()

  return Math.ceil(totalItemCount / itemsPerPage)
}
