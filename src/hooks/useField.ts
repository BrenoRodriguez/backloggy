'use client'

import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form'

export function useField<T extends FieldValues, K extends Path<T>>(
  name: K,
  control: Control<T> | undefined,
) {
  const { field, fieldState } = useController<T, K>({ name, control })

  const { invalid, isDirty, isTouched, error } = fieldState
  const { ref, value, onBlur, onChange } = field

  return {
    invalid,
    isDirty,
    isTouched,
    error,
    ref,
    value,
    onBlur,
    onChange,
  }
}
