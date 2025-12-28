import type { ComponentProps } from 'react'
import { useAutoCompleteInput } from '../../hooks'
import { Input } from './Input'
import { SuggestionsDropdown } from './SuggestionsDropdown/SuggestionsDropdown'

type AutoCompleteInputProps = ComponentProps<'input'> & {
  options: string[]
  onChange: (value: string) => void
  hasError?: string
}

export const AutoCompleteInput = ({
  options,
  onChange,
  hasError,
  ...props
}: AutoCompleteInputProps) => {
  const {
    suggestions,
    highlightedIndex,
    inputRef,
    updateFilteredSuggestions,
    handleKeyDown,
    handleBlur,
    selectSuggestion,
  } = useAutoCompleteInput(options, onChange)

  return (
    <div className='relative w-full'>
      <Input
        ref={inputRef}
        onChange={(event) => {
          updateFilteredSuggestions(event.target.value)
          onChange(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        hasError={hasError}
        {...props}
      />
      <SuggestionsDropdown
        options={suggestions}
        highlightedIndex={highlightedIndex}
        isVisible={suggestions.length > 0}
        selectOption={selectSuggestion}
      />
    </div>
  )
}
