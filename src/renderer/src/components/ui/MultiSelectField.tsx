import type { ComponentProps } from 'react'
import { MultiSelect } from './MultiSelect/MultiSelect'
import { Field } from './Field'
import { FieldError } from './FieldError'

type MultiSelectFieldProps = ComponentProps<'input'> & {
  options: string[]
  selectedItems: string[]
  onChange: (value: string[]) => void
  fieldName: string
  label?: string
  errorMessage?: string
}

export const MultiSelectField = ({
  label,
  fieldName,
  selectedItems,
  options,
  onChange,
  errorMessage,
}: MultiSelectFieldProps) => {
  return (
    <Field>
      <div className='flex items-center gap-2 text-lg'>
        {label && <label htmlFor={fieldName}>{label}</label>}
        <MultiSelect.SelectedItems
          selectedItems={selectedItems}
          onChange={onChange}
        />
      </div>
      <MultiSelect
        id={fieldName}
        onChange={onChange}
        options={options}
        selectedItems={selectedItems}
        hasError={errorMessage}
      />
      <FieldError errorMessage={errorMessage} />
    </Field>
  )
}
