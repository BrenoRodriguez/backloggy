export const getBacklogGameById = async (gameId?: number) => {
  return await window.api.getBacklogGameById(gameId)
}
