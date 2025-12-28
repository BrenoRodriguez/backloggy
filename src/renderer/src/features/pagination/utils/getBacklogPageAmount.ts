export const getBacklogPageAmount = async (itemsPerPage: number = 30) => {
  return await window.api.getBacklogPageAmount(itemsPerPage)
}
