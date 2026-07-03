'use client'

import { useField } from '@/hooks'
import { Field as FieldPrimitive, type FieldControlProps } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Field } from './ui'

const INPUT_BASE_STYLE =
  'rounded-sm border border-neutral-800 bg-foreground px-2 py-1 text-lg transition-colors duration-200 ease-in hover:border-accent-light focus-visible:border-accent-normal focus-visible:outline-none aria-invalid:border-red-500'

type InputFieldProps<T extends FieldValues> = FieldControlProps &
  UseControllerProps<T> & {
    displayErrors?: boolean
    label?: React.ReactNode
    className?: string
  }

export function InputField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  className,
  displayErrors = false,
  ...props
}: InputFieldProps<T>) {
  const { invalid, isDirty, isTouched, ref, onBlur, value, onChange, error } =
    useField<T>(name, control, rules)

  return (
    <Field
      invalid={invalid}
      isDirty={isDirty}
      isTouched={isTouched}
      name={name}
      className={className}
      label={label}
      error={error}
      displayErrors={displayErrors}
    >
      <FieldPrimitive.Control
        ref={ref}
        type='text'
        value={value ?? ''}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        onValueChange={onChange}
        className={twMerge(INPUT_BASE_STYLE)}
        autoComplete='off'
        {...props}
      />
    </Field>
  )
}
