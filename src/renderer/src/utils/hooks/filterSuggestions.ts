export const filterSuggestions = (query: string, options: string[]) => {
  return options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  )
}
