import { useField } from '@/hooks'
import type { FieldProps } from '@/types'
import { Combobox } from '@base-ui/react'
import type { FieldValues } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Field } from './ui'

type Options = { label: string; value: string }[] | string[]

type ComboboxFieldProps<T extends FieldValues> = FieldProps<T> & {
  options: Options
  emptyText?: string
}

export function ComboboxField<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  className,
  emptyText = 'No matches found.',
  options,
  displayError = false,
}: ComboboxFieldProps<T>) {
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
      displayErrors={displayError}
    >
      <Combobox.Root
        onValueChange={(newValue) => onChange(newValue ?? '')}
        value={value ?? ''}
        items={options}
        autoHighlight={true}
        limit={4}
        itemToStringLabel={(val) => {
          const option = options.find((opt) =>
            typeof opt === 'object' ? opt.value === val : opt === val,
          )
          return typeof option === 'object' ? option.label : (option ?? '')
        }}
      >
        <Combobox.Input
          ref={ref}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          className='rounded-sm border border-neutral-800 bg-foreground px-2 py-1 text-lg transition-colors duration-200 ease-in hover:border-accent-light focus-visible:border-accent-normal focus-visible:outline-none aria-invalid:border-red-500'
          autoComplete='off'
        />
        <Combobox.Portal>
          <Combobox.Positioner
            side='bottom'
            align='start'
            className={twMerge('mt-0.5', className)}
          >
            <Combobox.Popup
              className={twMerge(
                'w-(--anchor-width) rounded-b-sm border border-stone-800 bg-neutral-950 text-white',
                className,
              )}
            >
              <Combobox.Empty>{emptyText}</Combobox.Empty>
              <Combobox.List>
                {(item) => (
                  <Combobox.Item
                    key={item?.value ?? item}
                    value={item?.value ?? item}
                    className='w-full cursor-pointer px-3 py-1 data-highlighted:bg-accent-normal'
                  >
                    <div className='col-start-2 w-full text-white'>
                      {item?.label ?? item}
                    </div>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field>
  )
}
