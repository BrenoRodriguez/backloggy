export const formatLength = (length?: number | null): string => {
  return length ? `${length} Hours` : 'Unknown'
}
