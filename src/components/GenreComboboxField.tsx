'use client'

import { useField } from '@/hooks'
import type { FieldControlProps } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { Field } from './ui'

type GenreComboboxFieldProps<T extends FieldValues> = Omit<
  FieldControlProps,
  'onChange'
> &
  UseControllerProps<T> & {
    label?: string
    options: { id: number; name: string }
    displayError?: boolean
  }

export function GenreComboboxField<T extends FieldValues>({
  name,
  control,
  rules,
  className,
  label,
  displayError,
}: GenreComboboxFieldProps<T>) {
  const { invalid, isDirty, isTouched, value, onChange, error } = useField<T>(
    name,
    control,
    rules,
  )

  return (
    <Field
      invalid={invalid}
      isDirty={isDirty}
      isTouched={isTouched}
      name={name}
      label={label}
      error={error}
      displayErrors={displayError}
    >
      a
    </Field>
  )
}
