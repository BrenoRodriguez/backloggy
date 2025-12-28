import { useAutoCompleteCore } from './useAutoCompleteCore'

export const useMultiSelect = (
  options: string[],
  selectedItems: string[],
  onChange: (value: string[]) => void,
) => {
  const {
    inputRef,
    highlightPreviousOption,
    highlightNextOption,
    resetSuggestions,
    ...otherProperties
  } = useAutoCompleteCore(options)

  const selectSuggestion = (option: string) => {
    if (!inputRef?.current) return

    inputRef.current.value = option
    inputRef.current.focus()

    resetSuggestions()
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const value = event.currentTarget.value.trim()

    const isAlreadySelected = selectedItems.some((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    )

    if (!value || isAlreadySelected) return

    onChange([...selectedItems, value])
    event.currentTarget.value = ''
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
    inputRef,
    selectSuggestion,
    handleKeyDown,
    ...otherProperties,
  }
}
