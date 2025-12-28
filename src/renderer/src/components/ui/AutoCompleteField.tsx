import type { ComponentProps } from 'react'
import { AutoCompleteInput } from './AutoCompleteInput'
import { FieldError } from './FieldError'
import { Field } from './Field'

type AutoCompleteFieldProps = ComponentProps<'input'> & {
  options: string[]
  onChange: (value: string) => void
  fieldName: string
  label?: string
  errorMessage?: string
}

export const AutoCompleteField = ({
  label,
  fieldName,
  errorMessage,
  options,
  onChange,
  ...props
}: AutoCompleteFieldProps) => {
  return (
    <Field>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <AutoCompleteInput
        {...props}
        options={options}
        onChange={onChange}
        hasError={errorMessage}
      />
      <FieldError errorMessage={errorMessage} />
    </Field>
  )
}
