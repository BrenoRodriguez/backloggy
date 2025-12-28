type TruncatedText = {
  displayText: string
  isTruncated: boolean
}

export function truncateText(
  text: string,
  maxLength: number = 30,
): TruncatedText {
  const isTruncated = text.length > maxLength
  const displayText = isTruncated ? `${text.slice(0, maxLength - 3)}...` : text

  return { displayText, isTruncated }
}
