import { COMMA_SPACE_LENGTH, DEFAULT_MAX_LENGTH } from '../constants'

export const formatGenres = (
  genres: string[],
  maxLength: number = DEFAULT_MAX_LENGTH,
): string => {
  let currentLength = 0

  return genres
    .filter((genre) => {
      const lengthToAdd = genre.length + COMMA_SPACE_LENGTH

      if (currentLength + lengthToAdd >= maxLength) return false

      currentLength += lengthToAdd

      return true
    })
    .join(', ')
}
