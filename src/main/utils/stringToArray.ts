export const stringToArray = (text: string): string[] => {
  return text.split(',').filter(Boolean)
}
