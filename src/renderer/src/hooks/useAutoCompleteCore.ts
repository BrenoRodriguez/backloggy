import { type KeyboardEvent, useRef, useState } from 'react'
import { ONE_MILISECOND } from '../utils/constants'
import { filterSuggestions } from '../utils'

export const useAutoCompleteCore = (options: string[]) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const resetSuggestions = () => {
    setSuggestions([])
    setHighlightedIndex(-1)
  }

  const updateFilteredSuggestions = (query: string) => {
    if (!query) return resetSuggestions()

    const newSuggestions = filterSuggestions(query, options)

    const doesInputAlreadyMatchNewSuggestions = newSuggestions.some(
      (suggestion) => suggestion.toLowerCase() === query.toLowerCase(),
    )

    if (doesInputAlreadyMatchNewSuggestions) {
      return resetSuggestions()
    }

    setSuggestions(newSuggestions)
    setHighlightedIndex(0)
  }

  const highlightPreviousOption = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    setHighlightedIndex((currentIndex) =>
      currentIndex > 0 ? currentIndex - 1 : currentIndex,
    )
  }

  const highlightNextOption = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    setHighlightedIndex((currentIndex) =>
      currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0,
    )
  }

  const handleBlur = () => {
    const timeoutId = setTimeout(resetSuggestions, ONE_MILISECOND)
    clearTimeout(timeoutId)
  }

  return {
    suggestions,
    highlightedIndex,
    inputRef,
    updateFilteredSuggestions,
    handleBlur,
    highlightPreviousOption,
    highlightNextOption,
    resetSuggestions,
  }
}
