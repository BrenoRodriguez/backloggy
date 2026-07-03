type TruncatedText = {
  displayText: string
  isTruncated: boolean
}

export function truncateText(
  text: string,
  maxLength: number = 30,
): TruncatedText {
  const isTruncated = text.length > maxLength
  const ELLIPSIS_LENGTH = 3

  const displayText = isTruncated
    ? `${text.slice(0, maxLength - ELLIPSIS_LENGTH)}...`
    : text

  return { displayText, isTruncated }
}
