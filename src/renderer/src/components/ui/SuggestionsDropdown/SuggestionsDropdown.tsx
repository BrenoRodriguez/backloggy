import { SuggestionsContainer } from './SuggestionsContainer'

type SuggestionsDropdownProps = {
  options: string[]
  highlightedIndex: number
  isVisible: boolean
  selectOption: (option: string) => void
}

export const SuggestionsDropdown = ({
  options,
  highlightedIndex,
  isVisible,
  selectOption,
}: SuggestionsDropdownProps) => {
  if (!isVisible) return null

  return (
    <SuggestionsContainer
      options={options}
      highlightedIndex={highlightedIndex}
      selectOption={selectOption}
    />
  )
}
