import { useAutoCompleteCore } from './useAutoCompleteCore'

export const useAutoCompleteInput = (
  options: string[],
  onChange: (value: string) => void,
) => {
  const {
    suggestions,
    highlightedIndex,
    inputRef,
    updateFilteredSuggestions,
    handleBlur,
    highlightPreviousOption,
    highlightNextOption,
    resetSuggestions,
  } = useAutoCompleteCore(options)

  const selectSuggestion = (option: string) => {
    if (!inputRef?.current) return

    onChange(option)
    inputRef.current.blur()

    resetSuggestions()
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (highlightedIndex < 0 || suggestions.length <= 0) return

    selectSuggestion(suggestions[highlightedIndex])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      return highlightPreviousOption(event)
    }

    if (event.key === 'ArrowDown') {
      return highlightNextOption(event)
    }

    if (event.key === 'Enter') {
      return handleEnter(event)
    }
  }

  return {
    suggestions,
    highlightedIndex,
    inputRef,
    updateFilteredSuggestions,
    selectSuggestion,
    handleKeyDown,
    handleBlur,
  }
}
