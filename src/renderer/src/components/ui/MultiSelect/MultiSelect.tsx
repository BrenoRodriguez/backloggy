import type { ComponentProps } from 'react'
import { useMultiSelect } from '../../../hooks'
import { Input } from '../Input'
import { SuggestionsDropdown } from '../SuggestionsDropdown/SuggestionsDropdown'
import { SelectedItems } from './SelectedItems'

type MultiSelectProps = ComponentProps<'input'> & {
  options: string[]
  selectedItems: string[]
  onChange: (selectedItems: string[]) => void
  hasError?: string
}

export const MultiSelect = ({
  options,
  selectedItems,
  onChange,
  ...props
}: MultiSelectProps) => {
  const {
    suggestions,
    highlightedIndex,
    inputRef,
    updateFilteredSuggestions,
    handleKeyDown,
    handleBlur,
    selectSuggestion,
  } = useMultiSelect(options, selectedItems, onChange)

  return (
    <div className='relative w-full'>
      <Input
        ref={inputRef}
        {...props}
        onChange={(event) => updateFilteredSuggestions(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <SuggestionsDropdown
        highlightedIndex={highlightedIndex}
        options={options}
        selectOption={selectSuggestion}
        isVisible={suggestions.length > 0}
      />
    </div>
  )
}

MultiSelect.SelectedItems = SelectedItems
