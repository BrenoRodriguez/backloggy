'use client'

import {
  type Control,
  type FieldValues,
  type Path,
  useController,
  type UseControllerProps,
} from 'react-hook-form'

export function useField<T extends FieldValues>(
  name: Path<T>,
  control: Control<T, any, T> | undefined,
  rules: UseControllerProps<T>['rules'],
) {
  const { field, fieldState } = useController<T>({ name, control, rules })

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
