'use client'

import { useField } from '@/hooks'
import type { FieldControlProps } from '@base-ui/react'
import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { Field } from './ui'

export type ToggleOption = {
  value: string
  label: React.ReactNode
  ariaLabel: string
}

type ToggleGroupFieldProps<T extends FieldValues> = Omit<
  FieldControlProps,
  'onChange'
> &
  UseControllerProps<T> & {
    label?: string
    options: ToggleOption[]
    displayError?: boolean
  }

export function ToggleGroupField<T extends FieldValues>({
  name,
  options,
  control,
  rules,
  label,
  displayError = false,
}: ToggleGroupFieldProps<T>) {
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
      className='flex w-full flex-col gap-1 bg-neutral-950'
    >
      <ToggleGroup
        onValueChange={(newValue) => {
          onChange(newValue[0] ?? null)
        }}
        value={value ? [value] : []}
        multiple={false}
        className='flex gap-2'
      >
        {options.map((option) => (
          <Toggle
            key={option.ariaLabel}
            aria-label={option.ariaLabel}
            value={option.value}
            className='flex w-32 cursor-pointer items-center justify-center gap-2 rounded-sm border border-neutral-800 bg-neutral-900 py-1 transition-all duration-200 ease-in hover:border-accent-light hover:bg-neutral-800 hover:text-accent-light data-pressed:border-accent-light data-pressed:bg-neutral-800 data-pressed:text-accent-light'
          >
            {option.label}
          </Toggle>
        ))}
      </ToggleGroup>
    </Field>
  )
}
