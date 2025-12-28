import { fetchBacklogGameById } from '../repositories'

export const getBacklogGameById = async (id?: number) => {
  return await fetchBacklogGameById(id)
}
