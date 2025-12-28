import { SuggestionsOption } from './SuggestionsOption'

type SuggestionsContainerProps = {
  options: string[]
  highlightedIndex: number
  selectOption: (option: string) => void
}

export const SuggestionsContainer = ({
  options,
  highlightedIndex,
  selectOption,
}: SuggestionsContainerProps) => {
  return (
    <ul>
      {options.map((option, index) => (
        <SuggestionsOption
          option={option}
          key={`${option + index}`}
          isHighlightedIndex={highlightedIndex === index}
          selectOption={selectOption}
        />
      ))}
    </ul>
  )
}
