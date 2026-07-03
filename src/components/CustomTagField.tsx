import { useSettings } from '@/features/settings/context'
import type { TagSettings } from '@/features/settings/types'
import type { FieldControlProps } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { AutocompleteField } from './AutoCompleteField'

type CustomTagProps<T extends FieldValues> = FieldControlProps &
  UseControllerProps<T> & {
    displayError?: boolean
    label?: React.ReactNode
    className?: string
    customTagNumber: 0 | 1 | 2 | 3 | 4
  }

export function CustomTagField<T extends FieldValues>({
  customTagNumber,
  name,
  control,
  className,
  label,
  displayError = false,
  rules,
}: CustomTagProps<T>) {
  const { tagSettings } = useSettings()
  const customTag = tagSettings[customTagNumber]

  if (customTag.type === 'TEXT') {
    return (
      <TextInput
        customTag={customTag}
        name={name}
        control={control}
        label={label}
        displayError={displayError}
        rules={rules}
        className={className}
      />
    )
  }
}

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  displayError?: boolean
  label?: React.ReactNode
  className?: string
  customTag: TagSettings
}

function TextInput<T extends FieldValues>({
  name,
  control,
  rules,
  displayError = false,
  className,
  customTag,
}: TextInputProps<T>) {
  // autocomplete
  return (
    <AutocompleteField
      control={control}
      name={name}
      label={customTag.label}
      disabled={customTag.active}
      rules={rules}
      displayErrors={displayError}
      className={className}
      options={customTag.presets}
    />
  )
}
