import { useField } from '@/hooks'
import { Autocomplete, type FieldControlProps } from '@base-ui/react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Field } from './ui'

type AutocompleteFieldProps<T extends FieldValues> = FieldControlProps &
  UseControllerProps<T> & {
    displayErrors?: boolean
    label?: React.ReactNode
    className?: string
    options?: string[]
  }

export function AutocompleteField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  className,
  displayErrors = false,
  options = [],
  ...props
}: AutocompleteFieldProps<T>) {
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
      <Autocomplete.Root
        items={options}
        onValueChange={(newValue) => onChange(newValue ?? '')}
        value={value ?? ''}
        autoHighlight={true}
        limit={4}
      >
        <Autocomplete.Input
          ref={ref}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          className='rounded-sm border border-neutral-800 bg-foreground px-2 py-1 text-lg transition-colors duration-200 ease-in hover:border-accent-light focus-visible:border-accent-normal focus-visible:outline-none aria-invalid:border-red-500'
        />
        <Autocomplete.Portal>
          <Autocomplete.Positioner
            side='bottom'
            align='start'
            className={twMerge('mt-0.5', className)}
          >
            <Autocomplete.Popup
              className={twMerge(
                'w-(--anchor-width) rounded-b-sm border border-stone-800 bg-neutral-950 text-white',
                className,
              )}
            >
              <Autocomplete.Empty>
                <Autocomplete.Empty>{}</Autocomplete.Empty>
              </Autocomplete.Empty>
              <Autocomplete.List>
                {(option) => (
                  <Autocomplete.Item
                    key={option}
                    className='w-full cursor-pointer px-3 py-1 data-highlighted:bg-accent-normal'
                    value={option}
                  >
                    <div className='col-start-2 w-full text-white'>
                      {option}
                    </div>
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </Field>
  )
}
