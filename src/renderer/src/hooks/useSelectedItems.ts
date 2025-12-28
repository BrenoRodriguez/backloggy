export const useSelectedItems = (
  selectedItems: string[],
  onChange: (selectedItems: string[]) => void,
) => {
  const removeItem = (itemToRemove: string) => () => {
    onChange(selectedItems.filter((item) => item !== itemToRemove))
  }

  return {
    removeItem,
  }
}
