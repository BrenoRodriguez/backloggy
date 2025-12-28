import { truncateText } from '../utils/truncateText'
import { Tooltip } from './ui'

type DisplayNameProps = {
  name: string
  maxLength?: number
}

export const DisplayName = ({ name, maxLength = 30 }: DisplayNameProps) => {
  const { displayText, isTruncated } = truncateText(name, maxLength)

  if (!isTruncated) return displayText

  return <Tooltip label={displayText}>{name}</Tooltip>
}
