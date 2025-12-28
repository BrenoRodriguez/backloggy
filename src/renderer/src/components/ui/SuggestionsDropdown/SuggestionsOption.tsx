// biome-ignore-all lint/a11y/useFocusableInteractive: reference
// biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: reference
// biome-ignore-all lint/a11y/useKeyWithClickEvents: reference

type SuggestionsOptionProps = {
  option: string
  isHighlightedIndex: boolean
  selectOption: (option: string) => void
}

export const SuggestionsOption = ({
  option,
  isHighlightedIndex,
  selectOption,
}: SuggestionsOptionProps) => {
  return (
    <li
      role='option'
      aria-selected={isHighlightedIndex}
      onClick={() => selectOption(option)}
    >
      {option}
    </li>
  )
}
